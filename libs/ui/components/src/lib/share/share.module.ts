import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { ShareMessageDialog } from './message.dialog'
import { ShareComponent } from './share.component'
import { CommonModule } from '@angular/common'
import { ShareService } from './share.service'
import { NgModule } from '@angular/core'
import { TextFieldModule } from '@angular/cdk/text-field'

@NgModule({
  declarations: [ShareComponent, ShareMessageDialog],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    TextFieldModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
  ],
  exports: [ShareComponent, ShareMessageDialog],
  providers: [ShareService],
})
export class ShareModule {}
