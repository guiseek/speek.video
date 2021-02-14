import { MatTooltip } from '@angular/material/tooltip'
import { Platform } from '@angular/cdk/platform'
import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { UUID } from '@speek/util/format'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  data = ''
  url = `https://speek.video/#/${this.data}`
  key = new FormControl('', [
    Validators.required,
    Validators.pattern(UUID.regex),
  ])

  pitch = 1

  code = new FormControl('', Validators.required)
  comeInOut = new BehaviorSubject<boolean>(false)

  onChange(value: number) {
    this.pitch = value
  }
  constructor(private _platform: Platform) {}

  ngOnInit(): void {}

  onCopy(toolTip: MatTooltip) {
    toolTip.show()
    setTimeout(() => toolTip.hide(), 2000)
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
