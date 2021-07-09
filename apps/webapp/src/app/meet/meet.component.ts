import { SpeekAction, SpeekData, SpeekPayload } from '@speek/core/entity'
import { isDefined, notNull, typeOfFile, UUID } from '@speek/util/format'
import { MatSnackBar } from '@angular/material/snack-bar'
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
} from '@angular/core'
import {
  PeerAdapter,
  StreamAdapter,
  PeerDataAdapter,
  SignalingAdapter,
} from '@speek/core/adapter'
import { MeetService } from './meet.service'

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

  _caption = new BehaviorSubject<boolean>(true)
  caption = this._caption.asObservable()

  data: PeerDataAdapter
  peerChannel: RTCDataChannel

  peerSpeech: SpeechRecognition
  remoteTrack: TextTrack

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: MeetService,
    readonly peer: PeerAdapter,
    readonly stream: StreamAdapter,
    readonly signaling: SignalingAdapter,
    readonly userSetup: UserSetupStorage
  ) {
    this.code = this.route.snapshot.params.code
    this.service.listenFile(this.peer.connection)
    this.peerSpeech = new SpeechRecognition()
    this.peerSpeech.continuous = true
    this.peerSpeech.lang = 'pt-BR'
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

    this.stream.getStream({ video, audio }).then((stream) => {
      this.local.muted = true
      this.localStream = stream
      this.local.srcObject = stream

      const audio = stream.getAudioTracks()
      this.peer.connection.addTrack(audio.shift(), stream)

      const video = stream.getVideoTracks()
      this.peer.connection.addTrack(video.shift(), stream)

      /**
       * Legendas
       */
      this.remoteTrack = this.remote.addTextTrack('subtitles', this.code)

      this.peer.connection.addEventListener('datachannel', ({ channel }) => {
        channel.addEventListener('message', ({ data }) => {
          if (typeof data === 'string') {
            const time = this.remote.currentTime
            const end = time + (100 * data.length * 1.5) / 1000
            const caption = new VTTCue(time, end, data)
            this.remoteTrack.addCue(caption)
          }
        })
      })

      if (this._caption.getValue()) {
        this.remoteTrack.mode = 'showing'
        this.peerSpeech.start()
      }

      const channel = this.peer.connection.createDataChannel('track')
      channel.onopen = () =>
        (this.peerSpeech.onresult = ({ results, resultIndex }) => {
          channel.send(results.item(resultIndex).item(0).transcript)
        })
      channel.addEventListener('open', () => {
        this.peerSpeech.onresult = ({ results, resultIndex }) => {
          channel.send(results.item(resultIndex).item(0).transcript)
        }
      })

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

  toggleCaption() {
    const enabled = !this._caption.getValue()
    if (enabled) {
      this.remoteTrack.mode = 'showing'
      this.peerSpeech.start()
    } else {
      this.remoteTrack.mode = 'hidden'
      this.peerSpeech.stop()
    }
    this._caption.next(enabled)
  }

  onFileChange(files: FileList) {
    if (!!files.length) {
      typeOfFile(files.item(0)).then(({ verifiedType }) => {
        if (this.filesAllowed.includes(verifiedType)) {
          this.service.sendFile(this.peer.connection, files.item(0))
        } else {
          const message = 'Apenas arquivos conhecidos. Exemplo:'
          this.snackBar.open(`${message} ${this.filesAllowed}`)
        }
      })
    }
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
