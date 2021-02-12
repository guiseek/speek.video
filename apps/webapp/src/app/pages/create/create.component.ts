import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  pitch = 1

  code = new FormControl('', Validators.required)
  comeInOut = new BehaviorSubject<boolean>(false)

  onChange(value: number) {
    this.pitch = value
  }
  constructor() {}

  ngOnInit(): void {}
}
