import { SpeekPayload, SpeekAction, SpeekData } from '@speek/core/entity'
import { UserRoomStorage, UserSetupStorage } from '@speek/data/storage'
import { PeerAdapter, SignalingAdapter } from '@speek/core/adapter'
import { isDefined, notNull, UUID } from '@speek/util/format'
import { ActivatedRoute, Router } from '@angular/router'
import { stopStream } from '@speek/core/stream'
import { BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import {
  OnInit,
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit,
} from '@angular/core'

@Component({
  selector: 'speek-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit, AfterViewInit, OnDestroy {
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

  sender = UUID.short()
  code: string

  private state = new Subject<RTCSignalingState>()
  state$ = this.state.asObservable()

  private track = new Subject<MediaStream>()
  track$ = this.track.asObservable()

  constructor(
    private router: Router,
    private peer: PeerAdapter,
    private route: ActivatedRoute,
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

  sendOffer(data: SpeekData) {
    this.signaling.send(
      SpeekAction.Offer,
      new SpeekPayload(this.sender, this.code, data)
    )
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

  setLocal(payload?: SpeekPayload) {
    console.log('payload: ', payload)
    const { audio, video } = this.userSetup.getStoredValue()
    navigator.mediaDevices
      .getUserMedia({ video, audio })
      .then((stream) => {
        this.local.muted = true
        this.localStream = stream
        this.local.srcObject = stream

        const audioTrack = stream.getAudioTracks()
        this.peer.connection.addTrack(audioTrack.shift(), stream)

        const videoTrack = stream.getVideoTracks()
        this.peer.connection.addTrack(videoTrack.shift(), stream)

        this.peer.createOffer().then((sdp) => this.sendOffer({ sdp }))
      })
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

  hangup() {
    this.router.navigate(['/'])
  }
}
