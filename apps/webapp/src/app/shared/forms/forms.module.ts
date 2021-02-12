import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { DevicesComponent } from './devices/devices.component'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { MatSliderModule } from '@angular/material/slider'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [CheckboxComponent, DevicesComponent],
  exports: [CheckboxComponent, DevicesComponent, ReactiveFormsModule],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class FormsModule {}
