import { NgModule } from '@angular/core'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatSliderModule } from '@angular/material/slider'

@NgModule({
  exports: [
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatSliderModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    ScrollingModule,
    MatDividerModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
