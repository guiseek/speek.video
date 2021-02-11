import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject } from '@angular/core'

@Component({
  templateUrl: './wave.dialog.html',
  styleUrls: ['./wave.dialog.scss'],
})
export class WaveDialog {
  value: number = 1
  constructor(
    private _ref: MatDialogRef<WaveDialog>,
    @Inject(MAT_DIALOG_DATA) readonly code: string
  ) {}

  onChange(value: number) {
    this.value = value
  }

  onConfirm() {
    this._ref.close({ response: this.code, pitch: this.value })
  }
}
