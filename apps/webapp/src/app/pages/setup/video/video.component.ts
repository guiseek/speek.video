import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core'

@Component({
  selector: 'speek-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('video')
  videoRef: ElementRef<HTMLVideoElement>
  video: HTMLVideoElement
  videoStream: MediaStream
  constructor() {}

  ngAfterViewInit(): void {
    this.video = this.videoRef.nativeElement


    navigator.permissions.query({ name: 'camera' }).then((permission) => {

    })
  }
}
