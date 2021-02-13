import { MaterialModule } from '../../shared/material.module'
import { VideoComponent } from './video/video.component'
import { AudioComponent } from './audio/audio.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SetupComponent } from './setup.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { AudioModule } from '@speek/ui/components';
import { SetupContainer } from './setup.container'

@NgModule({
  declarations: [SetupComponent, AudioComponent, VideoComponent, SetupContainer],
  imports: [
    AudioModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SetupContainer,
        // children: [
        //   { path: '', redirectTo: 'audio' },
        //   { path: 'audio', component: AudioComponent },
        //   { path: 'video', component: VideoComponent },
        // ],
      },
    ]),
  ],
})
export class SetupModule {}
