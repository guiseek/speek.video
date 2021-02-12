import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { drawFrequency } from '../utils'

@Component({
  selector: 'speek-frequency',
  template: '<canvas #canvas></canvas>',
})
export class FrequencyComponent implements AfterViewInit {
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
    drawFrequency(nativeElement, analyserNode)

    const speakerNode = audioCtx.destination

    microphoneNode.connect(analyserNode)
    analyserNode.connect(speakerNode)
  }
}
