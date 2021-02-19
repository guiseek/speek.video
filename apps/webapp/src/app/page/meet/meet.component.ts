import { SpeekAction, SpeekData, SpeekPayload, WithTarget } from '@speek/core/entity'
import { getAudioConfig, getVideoConfig } from '@speek/util/device'
import { DrawerService, ShareService } from '@speek/ui/components'
import { isDefined, notNull, UUID } from '@speek/util/format'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSetupStorage } from '@speek/data/storage'
import { UserRoomStorage } from '@speek/data/storage'
import { stopStream } from '@speek/core/stream'
import { BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  PeerAdapter,
  SignalingAdapter,
  StreamAdapter,
} from '@speek/core/adapter'

@Component({
  selector: 'speek-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit, AfterViewInit, OnDestroy {
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
    private share: ShareService,
    private route: ActivatedRoute,
    readonly peer: PeerAdapter,
    readonly drawer: DrawerService,
    readonly stream: StreamAdapter,
    readonly userRoom: UserRoomStorage,
    readonly userSetup: UserSetupStorage,
    readonly signaling: SignalingAdapter
  ) {
    const { code } = this.route.snapshot.params
    this.code = code
  }

  ngOnInit(): void {
    this.signaling
      .on(SpeekAction.Offer)
      .pipe(takeUntil(this.destroy))
      .subscribe((payload) => this.handle(payload))

    const payload = new SpeekPayload(this.sender, this.code)
    this.signaling.send(SpeekAction.CreateOrJoin, payload)

    this.peer.onSignal.subscribe((state) => {
      this.signal.next(state)
    })

    this.peer.onState.subscribe((state) => {
      console.log('state: ', state)
      this.state.next(state)
      if (state === 'disconnected') {
        this.remote.srcObject = null
      }
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

    this.peer.onNegotiationNeeded.subscribe(
      ({ target }: WithTarget<RTCPeerConnection>) => {
        console.log('needed: ', target)
        this.status.next(target.connectionState)
      }
    )

    this.peer.onWarning.subscribe(({ description }) => {
      console.log('needed: ', description)
      this.status.next(description)
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
    this.stream
      .getStream({ video: getVideoConfig(), audio: getAudioConfig() })
      .then((stream) => {
        this.local.muted = true
        this.localStream = stream
        this.local.srcObject = stream

        const audio = stream.getAudioTracks()
        this.peer.connection.addTrack(audio.shift(), stream)

        const video = stream.getVideoTracks()
        this.peer.connection.addTrack(video.shift(), stream)

        this.peer.createOffer().then((sdp) => this.sendOffer({ sdp }))
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
