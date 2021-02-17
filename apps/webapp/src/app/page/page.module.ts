import { FormsModule } from '../shared/forms/forms.module'
import { MaterialModule } from '../shared/material.module'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ReactiveFormsModule } from '@angular/forms'
import { PageRoutingModule } from './page.routing'
import { LampAddonModule } from '@speek/ui/addons'
import { LayoutModule } from '@angular/cdk/layout'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { A11yModule } from '@angular/cdk/a11y'
import { NgModule } from '@angular/core'
import {
  NavbarModule,
  WaveModule,
  NetworkModule,
  DoorModule,
  DialpadModule,
  AudioModule,
  ShareModule,
  SplashModule,
  ToolbarModule,
} from '@speek/ui/components'
import { VoiceComponent } from './voice/voice.component'
import { InviteComponent } from './invite/invite.component'
import { CameraComponent } from './camera/camera.component'
import { DialupComponent } from './dialup/dialup.component'
import { CreateComponent } from './create/create.component'
import { HomeComponent } from './home/home.component'
import { RoomComponent } from './room/room.component'
import { HallComponent } from './hall/hall.component'
import { MeetComponent } from './meet/meet.component'
import { PeerStateBadgePipe } from '../shared/pipes/peer-state-badge.pipe'

@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    HallComponent,
    DialupComponent,
    CreateComponent,
    VoiceComponent,
    InviteComponent,
    CameraComponent,
    MeetComponent,
    PeerStateBadgePipe,
  ],
  imports: [
    CommonModule,
    A11yModule,
    LampAddonModule,
    PortalModule,
    SplashModule,
    DoorModule,
    WaveModule,
    AudioModule,
    ShareModule,
    FormsModule,
    NavbarModule,
    LayoutModule,
    DialpadModule,
    NetworkModule,
    ToolbarModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    // PageRoutingModule
    PageRoutingModule,
  ],
  providers: [PeerStateBadgePipe],
})
export class PageModule {}
