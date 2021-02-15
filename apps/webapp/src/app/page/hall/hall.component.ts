import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { UUID } from '@speek/util/format'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss'],
})
export class HallComponent implements OnInit {
  pitch = 1
  enter = false
  form = new FormGroup(
    {
      code: new FormControl('', [
        Validators.required,
        Validators.pattern(UUID.regex),
      ]),
      pitch: new FormControl(0, [Validators.min(-1.2), Validators.max(1.2)]),
    },
    { updateOn: 'blur' }
  )

  get code() {
    return this.form.get('code') as FormControl
  }

  comeInOut = new BehaviorSubject<boolean>(false)

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {}

  onClick() {
    this._router.navigate(['..'], {
      queryParams: { pitch: this.pitch },
      relativeTo: this._route,
    })
  }

  onChange(value: number) {
    this.pitch = value
  }

  onLogin() {
    if (this.code.valid) {
      this.comeInOut.next(!this.comeInOut.value)
      this.enter = true
      setTimeout(() => {
        this._router.navigate(['/', this.code.value])
      }, 3000)
    } else {
      this.comeInOut.next(!this.comeInOut.value)
      this.comeInOut.next(!this.comeInOut.value)
    }
  }
  onSubmit() {
    if (this.form.valid) {
      // this.userSetup.store(this.form.value)
      this._router.navigate(['/', UUID.long()])
    }
  }

}
