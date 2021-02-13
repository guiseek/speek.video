import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'speek-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {
  stream$: Observable<MediaStream>
  constructor() {
    this.stream$ = new Observable((subscriber) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => subscriber.next(stream))
    })
  }

  ngOnInit(): void {}
}
