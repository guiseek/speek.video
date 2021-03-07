import { SpeekAction, SpeekData, SpeekPayload } from '@speek/core/entity'
import { isDefined, notNull, typeOfFile, UUID } from '@speek/util/format'
import { AlertService, TransferService } from '@speek/ui/components'
import { TransferComponent } from './transfer/transfer.component'
import { MeetAddonDirective } from './meet-addon.directive'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSetupStorage } from '@speek/data/storage'
import { stopStream } from '@speek/core/stream'
import { BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ComponentFactoryResolver,
} from '@angular/core'
import {
  PeerAdapter,
  StreamAdapter,
  PeerDataAdapter,
  SignalingAdapter,
} from '@speek/core/adapter'

@Component({
  selector: 'speek-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy = new Subject<void>()

  @ViewChild(MeetAddonDirective, { static: true })
  meetAddon: MeetAddonDirective

  @ViewChild('local')
  localRef: ElementRef<HTMLVideoElement>
  local: HTMLVideoElement
  localStream: MediaStream

  @ViewChild('remote')
  remoteRef: ElementRef<HTMLVideoElement>
  remote: HTMLVideoElement
  remoteStream: MediaStream

  _audio = new BehaviorSubject<boolean>(true)
  audio = this._audio.asObservable()

  _video = new BehaviorSubject<boolean>(true)
  video = this._video.asObservable()

  data: PeerDataAdapter
  peerChannel: RTCDataChannel

  sender = UUID.short()
  code: string
  pitch: number

  readonly signal = new BehaviorSubject<RTCSignalingState>('closed')
  readonly signal$ = this.signal.asObservable()

  readonly state = new BehaviorSubject<RTCPeerConnectionState>('disconnected')
  readonly state$ = this.state.asObservable()

  readonly track = new Subject<MediaStream>()
  readonly onTrack = this.track.asObservable()

  readonly status = new Subject<string>()
  readonly status$ = this.status.asObservable()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    readonly peer: PeerAdapter,
    readonly stream: StreamAdapter,
    readonly transfer: TransferService,
    readonly signaling: SignalingAdapter,
    readonly userSetup: UserSetupStorage,
    readonly resolver: ComponentFactoryResolver
  ) {
    const { code } = this.route.snapshot.params
    this.code = code

    const sender = this.peer.connection.createDataChannel('send')

    this.peer.connection.addEventListener('datachannel', ({ channel }) => {
      const confirm = this.transfer.listen(channel)
      confirm.subscribe((res: string) => channel.send(res))
    })
  }

  ngOnInit(): void {
    this.signaling
      .on(SpeekAction.Offer)
      .pipe(takeUntil(this.destroy))
      .subscribe((payload) => this.handle(payload))

    const payload = new SpeekPayload(this.sender, this.code)
    this.signaling.send(SpeekAction.CreateOrJoin, payload)

    this.peer.onSignal.subscribe((state) => this.signal.next(state))

    this.peer.onState.subscribe((state) => this.state.next(state))

    this.peer.onCandidate
      .pipe(takeUntil(this.destroy))
      .subscribe((candidate) => {
        if (candidate) this.sendOffer({ ice: candidate })
      })

    this.peer.onTrack.pipe(takeUntil(this.destroy)).subscribe((track) => {
      this.track.next(track)
      if (track) {
        this.remote.srcObject = track
        track.onremovetrack = (ev) => {
          this.remote.srcObject = null
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.local = this.localRef.nativeElement
    this.remote = this.remoteRef.nativeElement

    this.signaling
      .on(SpeekAction.Created)
      .subscribe((payload) => this.setLocal(payload))

    this.signaling
      .on(SpeekAction.Joined)
      .subscribe((payload) => this.setLocal(payload))
  }

  async handle({ data, sender }: SpeekPayload) {
    try {
      if (sender !== this.sender) {
        if (notNull(this.peer.connection) && isDefined(data.ice)) {
          this.peer.addCandidate(data.ice)
        }
        if (data.sdp) {
          this.makeChoice(data.sdp)
        }
      }
    } catch (error) {
      throw new Error('handle-message: ' + error)
    }
  }

  async makeChoice(sdp: RTCSessionDescription) {
    switch (sdp.type) {
      case SpeekAction.Offer:
        return this.peer.createAnswer(sdp).then((answer) => {
          this.sendOffer({ sdp: answer })
        })
      case SpeekAction.Answer:
        return this.peer.setRemote(sdp)
    }
  }

  setLocal(payload?: SpeekPayload) {
    const audio = this.userSetup.getAudioConfig()
    const video = this.userSetup.getVideoConfig()

    this.stream.getStream({ video, audio }).then((stream) => {
      this.local.muted = true
      this.localStream = stream
      this.local.srcObject = stream

      const audio = stream.getAudioTracks()
      this.peer.connection.addTrack(audio.shift(), stream)

      const video = stream.getVideoTracks()
      this.peer.connection.addTrack(video.shift(), stream)

      this.peer.createOffer().then((sdp) => this.sendOffer({ sdp }))

      const state = this.userSetup.getStateConfig()

      if (state.video === false) {
        this.toggleVideo()
      }
      if (state.audio === false) {
        this.toggleAudio()
      }
    })
  }

  sendOffer(data: SpeekData) {
    this.signaling.send(
      SpeekAction.Offer,
      new SpeekPayload(this.sender, this.code, data)
    )
  }

  toggleAudio() {
    const enabled = !this._audio.getValue()
    const tracks = this.localStream.getAudioTracks()
    tracks.forEach((t) => (t.enabled = enabled))
    this._audio.next(enabled)
  }

  toggleVideo() {
    const enabled = !this._video.getValue()
    const tracks = this.localStream.getVideoTracks()
    tracks.forEach((t) => (t.enabled = enabled))
    this._video.next(enabled)
  }

  loadTransfer(channel: RTCDataChannel) {
    const factory = this.resolver.resolveComponentFactory(TransferComponent)

    const viewRef = this.meetAddon.viewContainerRef
    viewRef.clear()

    const cmpRef = viewRef.createComponent<TransferComponent>(factory)
    cmpRef.instance.data = channel
  }

  onFileChange(files: FileList) {
    if (!!files.length) {
      typeOfFile(files.item(0)).then((file) => {
        if (file) {
          const channel = this.peer.connection.createDataChannel(this.code)
          this.transfer.send(channel, file)
        }
      })
    }
  }

  openTransfer() {
    const conn = this.peer.connection
    const channel = conn.createDataChannel(this.code)
    channel.onopen = () => {
      channel.send('file')
    }
    channel.onmessage = ({ data }) => {
      console.log('message: ', data)
    }
    // this.transfer.selectFile().subscribe((response) => {
    //   console.log(response)
    //   this.data.sendFile(response as File)
    // })

    // this.peer.sendMessage({
    //   from: this.code,
    //   type: 'file',
    //   data: 'Daeeeee maluco, aceita aew',
    // })
    // this.peerData.send({ message: 'dae doido' })
    // this.transfer.open(this.peer.connection).subscribe((res) => {
    //   console.log(res)
    // })
  }

  hangup() {
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
    if (this.localStream) {
      stopStream(this.localStream)
    }
    if (this.peer?.connection) {
      console.log('close')
    }
  }
}
