import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { ConfirmDialog } from './confirm/confirm.dialog'
import { MatIconModule } from '@angular/material/icon'
import { AlertDialog } from './alert/alert.dialog'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [ConfirmDialog, AlertDialog],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  exports: [ConfirmDialog, AlertDialog],
})
export class AlertModule {}
