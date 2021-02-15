import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatTooltip } from '@angular/material/tooltip'
import { UUID } from '@speek/util/format'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import {
  AfterViewInit,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, AfterViewInit {
  @ViewChild('tip') tip: MatTooltip

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

  constructor(private _router: Router) {}

  ngOnInit(): void {
    const code = UUID.long()
    this.code.setValue(code)
    this.url = `${this.url}/${code}`
  }

  ngAfterViewInit(): void {
    if (this.tip) {
      const show = setTimeout(() => {
        this.tip.show()
        const hide = setTimeout(() => {
          this.tip.hide()
          this.tip.message = 'Copiado'
          clearTimeout(hide)
        }, 1250)
        clearTimeout(show)
      }, 250)
    }
  }

  onCopy(toolTip: MatTooltip) {
    toolTip.show()
    setTimeout(() => toolTip.hide(), 750)
    setTimeout(() => this.comeInOut.next(true), 1000)
    setTimeout(() => this._router.navigate(['/', this.code.value]), 3000)
  }
}
