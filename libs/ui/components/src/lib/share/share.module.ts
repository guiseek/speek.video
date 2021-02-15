import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { ShareComponent } from './share.component'
import { CommonModule } from '@angular/common'
import { ShareService } from './share.service'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [ShareComponent],
  imports: [CommonModule, MatListModule, MatBottomSheetModule, MatIconModule],
  exports: [ShareComponent],
  providers: [ShareService]
})
export class ShareModule {}
