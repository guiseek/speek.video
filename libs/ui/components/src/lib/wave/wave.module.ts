import { MatSliderModule } from '@angular/material/slider'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { WaveComponent } from './wave.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { WaveDialog } from './wave.dialog'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [WaveComponent, WaveDialog],
  exports: [WaveComponent, WaveDialog],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSliderModule,
    ReactiveFormsModule,
  ],
})
export class WaveModule {}
