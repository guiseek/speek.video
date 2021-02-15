import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DrawerComponent } from './drawer.component'
import { MatSidenavModule } from '@angular/material/sidenav'

@NgModule({
  declarations: [DrawerComponent],
  exports: [DrawerComponent],
  imports: [CommonModule, MatSidenavModule],
})
export class DrawerModule {}
