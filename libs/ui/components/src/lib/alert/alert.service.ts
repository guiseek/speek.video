import { DialogConfirmData } from './confirm/confirm.dialog'
import { MatDialog } from '@angular/material/dialog'
import { Injectable } from '@angular/core'
import { ConfirmDialog } from './confirm'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _dialog: MatDialog) {}

  openConfirm(data: DialogConfirmData) {
    return this._dialog.open<ConfirmDialog, DialogConfirmData>(ConfirmDialog, {
      data,
    })
  }
}
