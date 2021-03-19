import { SpeekAction, SpeekData, SpeekPayload } from '@speek/core/entity'
import { isDefined, notNull, typeOfFile, UUID } from '@speek/util/format'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSetupStorage } from '@speek/data/storage'
import { stopStream } from '@speek/core/stream'
import { BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { AppSound } from '../app.sound'
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
  selector: 'speek-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy = new Subject<void>()

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

  public readonly filesAllowed = [
    'image/png',
    'image/gif',
    'application/pdf',
    'image/jpeg',
    'image/svg+xml',
    'application/zip',
    'application/json',
    'video/mp4',
    'video/quicktime',
    'Unknown filetype',
  ]

  constructor(
    private router: Router,
    private sound: AppSound,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    readonly peer: PeerAdapter,
    readonly stream: StreamAdapter,
    readonly signaling: SignalingAdapter,
    readonly userSetup: UserSetupStorage,
    readonly resolver: ComponentFactoryResolver
  ) {
    this.code = this.route.snapshot.params.code

    this.sound.play(this.sound.hero.decorative(2))
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
        this.sound.play(this.sound.hero.simple(2))

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

    this.stream.getDisplay().then((stream) => {
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
