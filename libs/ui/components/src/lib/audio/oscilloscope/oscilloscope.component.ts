import {
  Input,
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core'
import { stopStream } from '@speek/core/stream'
import { drawOscilloscope } from '../utils'

@Component({
  selector: 'speek-oscilloscope',
  template: '<canvas #canvas></canvas>',
  styles: [`canvas { width: 100%; }`],
})
export class OscilloscopeComponent implements OnDestroy {
  @ViewChild('canvas')
  private canvas!: ElementRef<HTMLCanvasElement>

  private _stream!: MediaStream
  public get stream(): MediaStream {
    return this._stream
  }
  @Input()
  public set stream(value: MediaStream) {
    if (value instanceof MediaStream) {
      if (this._stream) {
        stopStream(this._stream)
      }
      this._stream = value
      this.draw(value)
    }
  }

  async draw(stream: MediaStream) {
    if (this.canvas.nativeElement) {
      const audioCtx = new AudioContext()

      const microphoneNode = audioCtx.createMediaStreamSource(stream)

      const analyserNode = audioCtx.createAnalyser()
      drawOscilloscope(this.canvas.nativeElement, analyserNode)

      const speakerNode = audioCtx.destination

      microphoneNode.connect(analyserNode)
      analyserNode.connect(speakerNode)
    }
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
  }
}
