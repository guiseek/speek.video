import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss'],
})
export class HallComponent implements OnInit {
  pitch = 1

  code = new FormControl('', Validators.required)
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
}
