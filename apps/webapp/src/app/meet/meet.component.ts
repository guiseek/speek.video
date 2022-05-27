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
import { isFirefox } from '@speek/util/device'

const filesAllowed: ReadonlyArray<string> = [
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

export type MediaSource = 'screen' | 'video'

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

  _source = new BehaviorSubject<MediaSource>('screen')
  source = this._source.asObservable()

  transceiver: Record<'audio' | 'video', RTCRtpTransceiver>

  _caption = new BehaviorSubject<boolean>(true)
  caption = this._caption.asObservable()

  _subtitles = new BehaviorSubject<string>('')
  substitles$ = this._subtitles.asObservable()

  data: PeerDataAdapter
  peerChannel: RTCDataChannel

  peerSpeech: SpeechRecognition
  remoteTrack: TextTrack

  sender = UUID.short()
  code: string
  pitch: number

  filesAllowed = filesAllowed

  isFirefox = isFirefox()

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
    private snackBar: MatSnackBar,
    private service: MeetService,
    readonly peer: PeerAdapter,
    readonly stream: StreamAdapter,
    readonly signaling: SignalingAdapter,
    readonly userSetup: UserSetupStorage
  ) {
    this.code = this.route.snapshot.params.code
    // this.service.listenFile(this.peer.connection)
    if (!isFirefox()) {
      this.peerSpeech = new SpeechRecognition()
      this.peerSpeech.continuous = true
      this.peerSpeech.lang = 'pt-BR'
    }
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

    this.transceiver = {
      video: this.peer.connection.addTransceiver('video'),
      audio: this.peer.connection.addTransceiver('audio'),
    }

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

    this.stream.getUser({ video, audio }).then((stream) => {
      this.local.muted = true

      const audio = stream.getAudioTracks().shift()
      this.peer.connection.addTrack(audio, stream)

      const video = stream.getVideoTracks().shift()
      this.peer.connection.addTrack(video, stream)
      this.swapLocalMedia(video)

      const channel = this.peer.connection.createDataChannel('track')
      channel.addEventListener('open', (ev) => {
        console.log('popen: ', ev)
      })

      const onMessage = <T extends string>({ data }: MessageEvent<T>) => {
        this._subtitles.next(data)
      }
      channel.onmessage = onMessage

      this.peer.connection.addEventListener('datachannel', ({ channel }) => {
        if (channel.label === 'track') {
          channel.onmessage = onMessage
        }
      })

      this.remoteTrack = this.remote.addTextTrack('subtitles', this.code)

      this.substitles$.subscribe((subtitle) => {
        const time = this.remote.currentTime
        const end = time + (100 * subtitle.length * 1.5) / 1000
        const caption = new VTTCue(time, end, subtitle)
        this.remoteTrack.addCue(caption)
      })

      if (!isFirefox() && this._caption.getValue()) {
        this.remoteTrack.mode = 'showing'
        this.peerSpeech.start()
        this.peerSpeech.onresult = ({ results, resultIndex }) => {
          channel.send(results.item(resultIndex).item(0).transcript)
        }
      }

      this.peer.createOffer().then((sdp) => this.sendOffer({ sdp }))

      const state = this.userSetup.getStateConfig()

      if (state.video === false) {
        this.toggleVideo()
      }
      if (state.audio === false) {
        this.toggleAudio()
      }
      if (!isFirefox() && state.caption === true) {
        this.toggleCaption()
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
    this.transceiver.audio.sender.track.enabled = enabled
    console.log(this.transceiver.audio.sender)
    this._audio.next(enabled)
  }

  toggleVideo() {
    const enabled = !this._video.getValue()
    this.transceiver.video.sender.track.enabled = enabled
    console.log(this.transceiver.video.sender)
    this._video.next(enabled)
  }

  getStreamFrom(source: MediaSource) {
    switch (source) {
      case 'screen':
        return this.stream.getDisplay()
      case 'video':
        return this.stream.getUser()
    }
  }

  swapSource(source: MediaSource) {
    return source === 'screen' ? 'video' : 'screen'
  }

  swapStream(source: MediaSource) {
    const sender = this.transceiver.video.sender

    this.getStreamFrom(source).then((stream) => {
      const [track] = stream.getVideoTracks()
      sender.replaceTrack(track)
      this.swapLocalMedia(track)
    })

    this._source.next(this.swapSource(source))
  }

  swapLocalMedia(video: MediaStreamTrack) {
    const media = new MediaStream()
    media.addTrack(video)
    this.local.srcObject = media
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
    if (files.length) {
      typeOfFile(files.item(0)).then(({ verifiedType }) => {
        if (filesAllowed.includes(verifiedType)) {
          this.service.sendFile(this.peer.connection, files.item(0))
        } else {
          const message = 'Apenas arquivos conhecidos. Exemplo:'
          this.snackBar.open(`${message} ${filesAllowed}`)
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
