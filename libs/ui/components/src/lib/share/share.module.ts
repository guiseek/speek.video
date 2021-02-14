import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatListModule } from '@angular/material/list'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShareComponent } from './share.component'

@NgModule({
  declarations: [ShareComponent],
  imports: [CommonModule, MatListModule, MatBottomSheetModule],
  exports: [ShareComponent],
})
export class ShareModule {}
