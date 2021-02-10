import { MatSliderModule } from '@angular/material/slider'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { WaveComponent } from './wave.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [WaveComponent],
  exports: [WaveComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    ReactiveFormsModule,
  ],
})
export class WaveModule {}
