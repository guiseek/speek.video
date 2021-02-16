import { SplashComponent } from './splash.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [SplashComponent],
  exports: [SplashComponent],
  imports: [CommonModule],
})
export class SplashModule {}
