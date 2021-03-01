import { MaterialModule } from '../shared/material.module'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ReactiveFormsModule } from '@angular/forms'
import { PageRoutingModule } from './page.routing'
import { LayoutModule } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { A11yModule } from '@angular/cdk/a11y'
import { NgModule } from '@angular/core'
import {
  AudioModule,
  DoorModule,
  ShareModule,
  SplashModule,
  ToolbarModule,
} from '@speek/ui/components'
import { PeerStateBadgePipe, PeerSignalBadgePipe } from '../shared/pipes'
import { HomeComponent } from './home/home.component'
import { MeetComponent } from './meet/meet.component'
import { SettingComponent } from './setting/setting.component'
import { AudioDialog } from './setting/audio/audio.dialog'
import { VideoDialog } from './setting/video/video.dialog'

@NgModule({
  declarations: [
    HomeComponent,
    MeetComponent,
    PeerStateBadgePipe,
    PeerSignalBadgePipe,
    SettingComponent,
    AudioDialog,
    VideoDialog,
  ],
  imports: [
    CommonModule,
    A11yModule,
    SplashModule,
    AudioModule,
    ShareModule,
    LayoutModule,
    ToolbarModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    PageRoutingModule,
  ],
  providers: [PeerStateBadgePipe],
})
export class PageModule {}
