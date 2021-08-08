import { SpeekAction, SpeekData, SpeekPayload } from '@speek/core/entity'
import { isDefined, notNull, UUID } from '@speek/util/format'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSetupStorage } from '@speek/data/storage'
import { stopStream } from '@speek/core/stream'
import { BehaviorSubject, Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'
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
  SignalingAdapter,
} from '@speek/core/adapter'

@Component({
  selector: 'speek-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
})
export class VoiceComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy = new Subject<void>()

  @ViewChild('local')
  localRef: ElementRef<HTMLAudioElement>
  local: HTMLAudioElement
  localStream: MediaStream

  @ViewChild('remote')
  remoteRef: ElementRef<HTMLVideoElement>
  remote: HTMLVideoElement
  remoteStream: MediaStream

  _audio = new BehaviorSubject<boolean>(true)
  audio = this._audio.asObservable()

  sender = UUID.short()
  code: string

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
    readonly peer: PeerAdapter,
    readonly stream: StreamAdapter,
    readonly signaling: SignalingAdapter,
    readonly userSetup: UserSetupStorage
  ) {
    this.code = this.route.snapshot.params.code
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
      .pipe(
        takeUntil(this.destroy),
        filter((candidate) => !!candidate)
      )
      .subscribe((candidate) => this.sendOffer({ ice: candidate }))

    this.peer.onTrack.pipe(takeUntil(this.destroy)).subscribe((track) => {
      this.track.next(track)
      if (track) this.remote.srcObject = track
    })
  }

  ngAfterViewInit(): void {
    this.local = this.localRef.nativeElement
    this.remote = this.remoteRef.nativeElement

    this.signaling
      .on(SpeekAction.Created)
      .pipe(takeUntil(this.destroy))
      .subscribe(this.setLocal)

    this.signaling
      .on(SpeekAction.Joined)
      .pipe(takeUntil(this.destroy))
      .subscribe(this.setLocal)
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

  setLocal = () => {
    const audio = this.userSetup.getAudioConfig()
    const video = this.userSetup.getVideoConfig()

    this.stream.getUser({ video, audio }).then((stream) => {
      this.local.srcObject = stream
      this.localStream = stream
      this.local.muted = true

      const audio = stream.getAudioTracks()
      this.peer.connection.addTrack(audio.shift(), stream)

      this.peer.createOffer().then((sdp) => this.sendOffer({ sdp }))

      const state = this.userSetup.getStateConfig()

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
