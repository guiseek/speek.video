import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { SnackComponent } from './snack.component'

@NgModule({
  declarations: [SnackComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [SnackComponent],
})
export class SnackModule {}
