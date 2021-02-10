import { BehaviorSubject, Subject } from 'rxjs'
import { FormControl } from '@angular/forms'
import { Voice } from '../../../utils/voice'
import { takeUntil } from 'rxjs/operators'
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-wave',
  templateUrl: './wave.component.html',
  styleUrls: ['./wave.component.scss'],
})
export class WaveComponent implements AfterViewInit, OnDestroy {
  @ViewChild('theCanvas')
  private _canvas: ElementRef<HTMLCanvasElement>
  canvas: HTMLCanvasElement

  private _audio = new BehaviorSubject<boolean>(true)
  audio = this._audio.asObservable()

  destroy = new Subject<void>()

  audioContext: AudioContext
  mediaStreamSource: MediaStreamAudioSourceNode
  delay: DelayNode
  voice: Voice

  shiftSlider = new FormControl(1)

  canvasContext: CanvasRenderingContext2D

  dataArray: Uint8Array
  analyser: AnalyserNode

  @Input() color = 'rgba(25, 25, 25, 1)'
  analyserMethod = 'getByteTimeDomainData'

  @Output() onStream = new EventEmitter<MediaStream>()

  ngAfterViewInit(): void {
    this.canvas = this._canvas.nativeElement
    if (this.canvas) {
      this.canvasContext = this.canvas.getContext('2d')
    }

    this.audioContext = new AudioContext()

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => this.gotStream(stream))
      .catch((error) => this.error(error))
  }

  gotStream = (stream: MediaStream) => {
    this.onStream.emit(stream)
    if (this.audioContext === null) {
      this.audioContext = new AudioContext()
    }
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream)

    this.analyser = this.audioContext.createAnalyser()
    this.delay = this.audioContext.createDelay()
    this.delay.delayTime.value = 0

    this.mediaStreamSource.connect(this.delay)

    this.voice = new Voice(this.audioContext)
    this.voice.setPitchOffset(1.6)

    this.delay.connect(this.voice.input)
    this.voice.output.connect(this.audioContext.destination)
    this.voice.output.connect(this.analyser)

    this.shiftSlider.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.voice.setPitchOffset(value)
      })

    if (this.canvasContext) {
      this.startDrawing()
    }
  }

  error = (message: Error) => {
    console.log(message)
  }

  startDrawing() {
    this.analyser.fftSize = 2048
    const bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(bufferLength)
    this.canvasContext.lineWidth = 1
    this.canvasContext.strokeStyle = this.color
    const drawAgain = () => {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
      requestAnimationFrame(drawAgain)
      this.analyser[this.analyserMethod](this.dataArray)
      for (let i = 0; i < bufferLength; i++) {
        this.canvasContext.beginPath()
        this.canvasContext.moveTo(i, 255)
        this.canvasContext.lineTo(i, 255 - this.dataArray[i])
        this.canvasContext.closePath()
        this.canvasContext.stroke()
      }
    }

    drawAgain()
  }

  setTracksState(enabled?: boolean) {
    const stream = this.mediaStreamSource?.mediaStream
    if (stream) {
      stream.getTracks().forEach((t) => (t.enabled = enabled))
    }
  }

  toggleAudio() {
    const enabled = !this._audio.getValue()
    this.setTracksState(enabled)
    this._audio.next(enabled)
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
    const stream = this.mediaStreamSource?.mediaStream
    stream.getTracks().forEach((t) => t.stop())
  }
}
