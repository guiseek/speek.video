import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { stopStream } from '@speek/core/stream'

@Component({
  selector: 'speek-video',
  templateUrl: './video.dialog.html',
  styleUrls: ['./video.dialog.scss'],
})
export class VideoDialog implements OnInit, OnDestroy {
  stream: MediaStream

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly constraints: MediaTrackConstraints
  ) {}

  ngOnInit(): void {
    const video = this.constraints
      ? this.constraints
      : { echoCancellation: true, noiseSuppression: true }

    navigator.mediaDevices
      .getUserMedia({ video })
      .then((stream) => (this.stream = stream))
  }
  ngOnDestroy(): void {
    stopStream(this.stream)
  }
}
