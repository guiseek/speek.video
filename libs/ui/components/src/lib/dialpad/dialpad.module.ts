import { MatButtonModule } from '@angular/material/button'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialpadComponent } from './dialpad.component'
import { ButtonComponent } from './button/button.component'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [DialpadComponent, ButtonComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [DialpadComponent, ButtonComponent],
})
export class DialpadModule {}
