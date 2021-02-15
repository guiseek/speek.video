import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject } from '@angular/core'

export interface DialogConfirmData {
  header: string
  body: string
}

@Component({
  templateUrl: './confirm.dialog.html'
})
export class ConfirmDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: DialogConfirmData
  ) {}
}
