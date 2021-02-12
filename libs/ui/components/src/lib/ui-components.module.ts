import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSidenavModule } from '@angular/material/sidenav'
import { DrawerComponent } from './drawer/drawer.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { CodeComponent, CodeDialog } from './code'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ClipboardModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  declarations: [CodeComponent, CodeDialog, DrawerComponent],
  exports: [CodeComponent, CodeDialog, DrawerComponent],
})
export class UiComponentsModule {}
