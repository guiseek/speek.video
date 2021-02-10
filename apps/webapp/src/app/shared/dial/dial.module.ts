import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { DialPadComponent } from './dial-pad/dial-pad.component'
import { DialButtonComponent } from './dial-pad/dial-button'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [DialPadComponent, DialButtonComponent],
  exports: [DialPadComponent, DialButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class DialModule {}
