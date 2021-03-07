import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, OnInit } from '@angular/core'

@Component({
  selector: 'speek-audio',
  templateUrl: './audio.dialog.html',
  styleUrls: ['./audio.dialog.scss'],
})
export class AudioDialog implements OnInit {
  stream: MediaStream

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly constraints: MediaTrackConstraints
  ) {}

  ngOnInit(): void {
    const audio = this.constraints
      ? this.constraints
      : { echoCancellation: true, noiseSuppression: true }

    navigator.mediaDevices
      .getUserMedia({ audio })
      .then((stream) => (this.stream = stream))
  }
}
