import { MatDialog } from '@angular/material/dialog'
import { AlertConfig } from './alert-config'
import { Injectable } from '@angular/core'
import { ConfirmDialog } from './confirm'
import { AlertDialog } from './alert/alert.dialog'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _dialog: MatDialog) {}

  openConfirm(data: AlertConfig) {
    return this._dialog.open<ConfirmDialog, AlertConfig, boolean>(
      ConfirmDialog,
      { data }
    )
  }

  openAlert(data: AlertConfig) {
    return this._dialog.open<AlertDialog, AlertConfig, boolean>(AlertDialog, {
      data,
      maxWidth: 350,
    })
  }
}
