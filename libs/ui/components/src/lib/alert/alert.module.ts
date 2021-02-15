import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { ConfirmDialog } from './confirm/confirm.dialog'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [ConfirmDialog],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  exports: [ConfirmDialog],
})
export class AlertModule {}
