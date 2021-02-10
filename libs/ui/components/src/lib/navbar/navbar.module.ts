import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { NavbarComponent } from './navbar.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  imports: [RouterModule, CommonModule, MatTabsModule, MatIconModule],
})
export class NavbarModule {}
