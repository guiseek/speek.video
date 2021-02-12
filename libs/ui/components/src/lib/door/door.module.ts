import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DoorComponent } from './door.component'

@NgModule({
  declarations: [DoorComponent],
  imports: [CommonModule],
  exports: [DoorComponent],
})
export class DoorModule {}
