import { MatListModule } from '@angular/material/list'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OptionsComponent } from './options.component'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'

@NgModule({
  declarations: [OptionsComponent],
  imports: [CommonModule, MatListModule, MatBottomSheetModule],
  exports: [OptionsComponent],
})
export class OptionsModule {}
