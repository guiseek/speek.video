import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatTooltip } from '@angular/material/tooltip'
import { Platform } from '@angular/cdk/platform'
import { UUID } from '@speek/util/format'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit {
  @ViewChild('tip') tip: MatTooltip
  @ViewChild('autoFix') autoFix: MatTooltip
  data = ''
  enter = false
  get url() {
    return `https://speek.video/#/invite/${this.code.value}`
  }
  form = new FormGroup(
    {
      code: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\d\-_\s]+$/i),
      ]),
    },
    { updateOn: 'blur' }
  )

  get code() {
    return this.form.get('code') as FormControl
  }

  comeInOut = new BehaviorSubject<boolean>(false)

  constructor(private _router: Router, private _platform: Platform) {}

  ngAfterViewInit(): void {
    if (this.autoFix) {
      const show = setTimeout(() => {
        this.autoFix.show()
        const hide = setTimeout(() => {
          this.autoFix.hide()
          clearTimeout(hide)
        }, 1500)
        clearTimeout(show)
      }, 250)
    }
    if (this.tip) {
      const show = setTimeout(() => {
        this.tip.show()
        const hide = setTimeout(() => {
          this.tip.hide()
          this.tip.message = 'Copiado'
          clearTimeout(hide)
        }, 1500)
        clearTimeout(show)
      }, 2000)
    }
  }

  onAutofix() {
    this.code.setValue(UUID.long())
  }

  onCopy(toolTip: MatTooltip) {
    toolTip.show()
    setTimeout(() => toolTip.hide(), 2000)
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

  onShare() {
    const text = 'Aqui está a chave da nossa reunião\n'
    // this._ref.close(this.data)
    window.open(
      (this._platform.isBrowser
        ? 'https://api.whatsapp.com/send?text='
        : 'whatsapp://send?text=') + encodeURIComponent(text + '\n' + this.url)
    )
  }
}
