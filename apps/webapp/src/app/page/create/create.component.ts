import { delay, take } from 'rxjs/operators'
import { UserRoom } from '@speek/core/entity'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatTooltip } from '@angular/material/tooltip'
import { UserRoomStorage } from '@speek/data/storage'
import { UUID } from '@speek/util/format'
import { Router } from '@angular/router'
import { BehaviorSubject, merge, timer } from 'rxjs'
import {
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tip') tip: MatTooltip
  showTip: number
  hideTip: number
  toggleTip: number

  url = `https://speek.video/#/invite`

  comeInOut = new BehaviorSubject<boolean>(false)

  @HostBinding('class.zoom')
  public get enter(): boolean {
    return this.comeInOut.value
  }

  form = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.pattern(UUID.regex),
    ]),
  })

  get code() {
    return this.form.get('code') as FormControl
  }

  constructor(private _router: Router, private _userRoom: UserRoomStorage) {}

  ngOnInit(): void {
    const code = UUID.long()
    this.code.setValue(code)
    this.url = `${this.url}/${code}`
  }

  ngAfterViewInit(): void {
    if (this.tip) {
      this.showTip = window.setTimeout(() => {
        this.tip.show()

        this.hideTip = window.setTimeout(() => {
          this.tip.hide()
          this.tip.message = 'Copiado'

          window.clearTimeout(this.hideTip)
        }, 2250)
        window.clearTimeout(this.showTip)
      }, 750)
    }
  }

  onCopy(toolTip: MatTooltip) {
    toolTip.show()

    this._userRoom.update(UserRoom.fromJson(this.form.value))

    setTimeout(() => toolTip.hide(), 750)
    setTimeout(() => this.comeInOut.next(true), 1000)
    setTimeout(() => this._router.navigate(['/', this.code.value, 'meet']), 3000)
  }

  ngOnDestroy(): void {
    if (this.toggleTip) {
      window.clearInterval(this.toggleTip)
    }
  }
}
