import { SpeekAction, SpeekData, SpeekPayload } from '@speek/core/entity'
import { UserSetupStorage } from '../../shared/data/user-setup.storage'
import { PeerAdapter, SignalingAdapter } from '@speek/core/adapter'
import { isDefined, notNull, UUID } from '@speek/util/format'
import { ActivatedRoute, Router } from '@angular/router'
import { stopStream, Voice } from '@speek/core/stream'
import { takeUntil, takeWhile } from 'rxjs/operators'
import { ShareService } from '@speek/ui/components'
import { BehaviorSubject, Subject } from 'rxjs'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy = new Subject<void>()

  _audio = new BehaviorSubject<boolean>(true)
  audio = this._audio.asObservable()

  _video = new BehaviorSubject<boolean>(true)
  video = this._video.asObservable()

  @ViewChild('local')
  localRef: ElementRef<HTMLVideoElement>
  local: HTMLVideoElement
  localStream: MediaStream

  @ViewChild('remote')
  remoteRef: ElementRef<HTMLVideoElement>
  remote: HTMLVideoElement
  remoteStream: MediaStream

  // peer: PeerAdapter
  sender = UUID.short()
  code: string
  pitch: number

  private state = new Subject<RTCSignalingState>()
  onState = this.state.asObservable()

  private track = new Subject<MediaStream>()
  onTrack = this.track.asObservable()

  constructor(
    private router: Router,
    private peer: PeerAdapter,
    private share: ShareService,
    private route: ActivatedRoute,
    readonly userSetup: UserSetupStorage,
    readonly signaling: SignalingAdapter
  ) {
    const { code } = this.route.snapshot.params
    // if (code === 'newcode') {
    //   this.router.navigate(['/', UUID.long()])
    // }
    this.code = code
  }

  ngOnInit(): void {
    this.signaling
      .on(SpeekAction.Offer)
      .pipe(takeUntil(this.destroy))
      .subscribe((payload) => this.handle(payload))

    const payload = new SpeekPayload(this.sender, this.code)
    this.signaling.send(SpeekAction.CreateOrJoin, payload)

    this.peer.onChange.subscribe((state) => {
      this.state.next(state.signalingState)
    })

    this.peer.onCandidate
      .pipe(takeUntil(this.destroy))
      .subscribe((candidate) => {
        if (candidate) {
          this.sendOffer({ ice: candidate })
        }
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
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.local.muted = true
        this.localStream = stream
        this.local.srcObject = stream

        const destination = this.gotVoice(stream)

        const audio = destination.stream.getAudioTracks()
        this.peer.connection.addTrack(audio.shift(), destination.stream)

        const video = stream.getVideoTracks()
        this.peer.connection.addTrack(video.shift(), destination.stream)

        this.peer.createOffer().then((sdp) => this.sendOffer({ sdp }))
      })
  }

  gotVoice(stream: MediaStream) {
    const context = new AudioContext()
    const source = context.createMediaStreamSource(stream)
    const destination = context.createMediaStreamDestination()

    const delay = context.createDelay()
    delay.delayTime.value = 0
    source.connect(delay)

    const voice = new Voice(context)
    const { pitch = 1.5 } = this.userSetup.getStoredValue() ?? {}
    voice.setPitchOffset(pitch)

    delay.connect(voice.input)
    voice.output.connect(destination)

    return destination
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

  hangup() {
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    // this.localStream.getTracks().forEach((t) => t.stop())
    this.destroy.next()
    this.destroy.complete()
    if (this.peer?.connection) {
      console.log('close')
    }
  }
}
