import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { SettingComponent } from './setting.component'
import { AudioComponent } from './audio/audio.component'
import { VideoComponent } from './video/video.component'
import { MaterialModule } from '../../shared/material.module'
import { ToolbarModule } from '@speek/ui/components'

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  children: [
    { path: '', redirectTo: 'audio' },
    { path: 'audio', component: AudioComponent },
    { path: 'video', component: VideoComponent }
  ]
}]

@NgModule({
  declarations: [SettingComponent, AudioComponent, VideoComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SettingModule {}
