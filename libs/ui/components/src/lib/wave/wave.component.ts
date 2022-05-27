import { BehaviorSubject, Subject } from 'rxjs'
import { FormControl } from '@angular/forms'
import { Voice } from '@speek/core/stream'
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
  template: `
    <canvas #theCanvas id="theCanvas" width="1024" height="256"></canvas>
    <mat-toolbar #toolbar>
      <mat-slider
        min="-1"
        max="2"
        step="0.1"
        thumbLabel
        [formControl]="shiftSlider"
      ></mat-slider>
      <button
        mat-icon-button
        [ngClass]="{ off: (audio | async) }"
        (click)="toggleAudio()"
      >
        <mat-icon> {{ (audio | async) ? 'mic' : 'mic_off' }} </mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        min-height: 80px;
      }
      canvas {
        width: 100%;
        max-width: 100%;
        position: absolute;
        bottom: 0;
      }
      .mat-toolbar {
        width: 100%;
        max-width: 100%;
        position: absolute;
        bottom: 0;
        background-color: transparent;
        justify-content: space-between;
      }
      .mat-slider {
        flex: 1;
      }
    `,
  ],
})
export class WaveComponent implements AfterViewInit, OnDestroy {
  @ViewChild('theCanvas')
  private _canvas!: ElementRef<HTMLCanvasElement>
  canvas!: HTMLCanvasElement

  private _audio = new BehaviorSubject<boolean>(true)
  audio = this._audio.asObservable()

  destroy = new Subject<void>()
  shiftSlider = new FormControl(1)

  audioContext!: AudioContext
  mediaStreamSource!: MediaStreamAudioSourceNode
  delay!: DelayNode
  voice!: Voice

  analyser!: AnalyserNode

  @Input() color = '#212121'

  @Output() onStream = new EventEmitter<MediaStream>()
  @Output() valueChange = new EventEmitter<number>()

  ngAfterViewInit(): void {
    this.canvas = this._canvas.nativeElement

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
        this.valueChange.emit(value)
      })

    this.startDrawing()
  }

  error = (message: Error) => {
    console.log(message)
  }

  startDrawing() {
    let canvasContext: CanvasRenderingContext2D | null
    if (this.canvas) {
      canvasContext = this.canvas.getContext('2d')

      this.analyser.fftSize = 2048
      const bufferLength = this.analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      if (canvasContext) {
        canvasContext.lineWidth = 1
        canvasContext.strokeStyle = this.color
        const drawAgain = () => {
          if (canvasContext) {
            canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
            requestAnimationFrame(drawAgain)
            this.analyser.getByteTimeDomainData(dataArray)
            for (let i = 0; i < bufferLength; i++) {
              canvasContext.beginPath()
              canvasContext.moveTo(i, 255)
              canvasContext.lineTo(i, 255 - dataArray[i])
              canvasContext.closePath()
              canvasContext.stroke()
            }
          }
        }
        drawAgain()
      }
    }
  }

  setTracksState(enabled?: boolean) {
    const stream = this.mediaStreamSource?.mediaStream
    if (stream) {
      stream.getTracks().forEach((t) => (t.enabled = !!enabled))
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
