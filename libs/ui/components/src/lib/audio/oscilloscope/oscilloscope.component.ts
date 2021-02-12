import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core'
import { drawOscilloscope } from '../utils'

@Component({
  selector: 'speek-oscilloscope',
  template: '<canvas #canvas></canvas>',
})
export class OscilloscopeComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvas!: ElementRef<HTMLCanvasElement>
  ngAfterViewInit(): void {
    if (this.canvas.nativeElement) {
      this.define(this.canvas)
    }
  }
  async define({ nativeElement }: ElementRef) {
    const audioCtx = new AudioContext()

    const microphoneNode = audioCtx.createMediaStreamSource(
      await navigator.mediaDevices.getUserMedia({ audio: true })
    )

    const analyserNode = audioCtx.createAnalyser()
    drawOscilloscope(nativeElement, analyserNode)

    const speakerNode = audioCtx.destination

    microphoneNode.connect(analyserNode)
    analyserNode.connect(speakerNode)
  }
}
