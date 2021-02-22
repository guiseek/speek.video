import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TransferDialog } from './transfer.dialog'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [TransferDialog],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [TransferDialog],
})
export class TransferModule {}
