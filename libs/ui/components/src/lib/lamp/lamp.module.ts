import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LampComponent } from './lamp.component'

@NgModule({
  declarations: [LampComponent],
  imports: [CommonModule],
  exports: [LampComponent],
})
export class LampModule {}
