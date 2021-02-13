import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'speek-setup',
  templateUrl: './setup.container.html',
  styleUrls: ['./setup.container.scss'],
})
export class SetupContainer implements OnInit {
  stream$: Observable<MediaStream>
  constructor() {
    this.stream$ = new Observable((subscriber) => {
      navigator.mediaDevices
        .getUserMedia({ audio: { echoCancellation: true } })
        .then((stream) => subscriber.next(stream))
    })
  }

  ngOnInit(): void {}
}
