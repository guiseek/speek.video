import { SignalingAdapter, StreamAdapter } from '@speek/core/adapter'
import { ActivatedRoute, Router } from '@angular/router'
import { SpeekPayload } from '@speek/core/entity'
import { Voice } from '@speek/core/stream'
import { Subject } from 'rxjs'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy = new Subject<void>()

  @ViewChild('video')
  videoRef: ElementRef<HTMLVideoElement>
  video: HTMLVideoElement
  videoStream: MediaStream

  @ViewChild('audio')
  audioRef: ElementRef<HTMLVideoElement>
  audio: HTMLVideoElement
  audioStream: MediaStream

  room: string

  constructor(
    private router: Router,
    private stream: StreamAdapter,
    private route: ActivatedRoute,
    readonly signaling: SignalingAdapter
  ) {
    const { room } = this.route.snapshot.params
    // if (room === 'newcode') {
    //   this.router.navigate(['/setup', UUID.long()])
    // }
    this.room = room
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.video = this.videoRef.nativeElement
    this.audio = this.audioRef.nativeElement
  }

  setLocal(payload?: SpeekPayload) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.video.muted = true
        this.video.srcObject = stream
      })
  }

  onVideoChange(input: MediaDeviceInfo) {
    console.log(input)
    this.stream
      .getStream({
        video: {
          optional: [
            {
              sourceId: input.deviceId,
            },
          ],
        },
      } as MediaStreamConstraints)
      .then((stream) => {
        this.videoStream = stream
        this.video.srcObject = stream
      })
  }

  onAudioChange(input: MediaDeviceInfo) {
    console.log(input)
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          optional: {
            sourceId: input.deviceId,
          },
        },
      } as MediaStreamConstraints)
      .then((stream) => {
        this.audioStream = stream
      })
  }

  gotVoice(stream: MediaStream) {
    let context: AudioContext
    if (!context) {
      context = new AudioContext()
    }

    const source = context.createMediaStreamSource(stream)
    const destination = context.createMediaStreamDestination()

    const delay = context.createDelay()
    delay.delayTime.value = 0
    source.connect(delay)

    const voice = new Voice(context)
    voice.setPitchOffset(1)

    delay.connect(voice.input)
    voice.output.connect(destination)

    return destination
  }

  hangup() {}

  ngOnDestroy(): void {
    this.stream.currentStream.getTracks().forEach((t) => t.stop())
    this.destroy.next()
    this.destroy.complete()
  }
}
