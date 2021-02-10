import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatTooltip } from '@angular/material/tooltip'
import { Platform } from '@angular/cdk/platform'
import { UUID } from '@speek/util/format'

@Component({
  templateUrl: './code.dialog.html',
  styleUrls: ['./code.dialog.scss'],
})
export class CodeDialog implements OnInit {
  url = `https://speek.video/#/${this.data}`
  key = new FormControl('', [
    Validators.required,
    Validators.pattern(UUID.regex),
  ])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _ref: MatDialogRef<CodeDialog>,
    private _platform: Platform
  ) {}

  ngOnInit(): void {
    this.key.setValue(this.data)
  }

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
