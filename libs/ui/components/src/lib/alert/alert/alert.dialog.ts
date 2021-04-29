import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject } from '@angular/core'
import { AlertConfig } from '../alert-config'

@Component({
  templateUrl: './alert.dialog.html',
  styles: [
    `
      .mat-dialog-content {
        text-align: center;
      }
      img {
        max-width: 120px;
        margin-bottom: 30px;
      }
    `,
  ],
})
export class AlertDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: AlertConfig
  ) {}
}
