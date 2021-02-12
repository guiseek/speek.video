import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { delay, map } from 'rxjs/operators'

@Component({
  selector: 'speek-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.scss'],
})
export class DoorComponent implements OnInit {
  @Input()
  comeInOut!: BehaviorSubject<boolean>

  @Output()
  onEnter = new EventEmitter<boolean>()

  io = false

  @Input()
  opened = false

  shake = new Subject<boolean>()

  constructor() {}

  ngOnInit(): void {
    if (this.comeInOut) {
      this.comeInOut
        .pipe(
          map((v) => {
            if (!this.opened) {
              this.shake.next(true)
            } else {
              this.io = v
            }
          }),
          delay(500)
        )
        .subscribe(() => {
          this.shake.next(false)
        })
    }
  }

  toggleInOut() {
    if (!this.opened) {
      this.shake.next(true)
    } else {
      this.comeInOut.next(!this.comeInOut.value)
    }
  }

  toggleDoor() {
    this.opened = !this.opened
  }
}
