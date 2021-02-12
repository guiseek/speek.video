import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OscilloscopeComponent } from './oscilloscope'
import { FrequencyComponent } from './frequency'

@NgModule({
  imports: [CommonModule],
  declarations: [OscilloscopeComponent, FrequencyComponent],
  exports: [OscilloscopeComponent, FrequencyComponent],
})
export class AudioModule {}
