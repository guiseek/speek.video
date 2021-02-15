import { PageRoutingModule } from './page.routing';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../shared/material.module'
import { FormsModule } from '../shared/forms/forms.module'
import { ReactiveFormsModule } from '@angular/forms'
import { LayoutModule } from '@angular/cdk/layout'
import { PortalModule } from '@angular/cdk/portal'
import { A11yModule } from '@angular/cdk/a11y'
import {
  NavbarModule,
  WaveModule,
  NetworkModule,
  DoorModule,
  DialpadModule,
  AudioModule,
  ShareModule,
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
  ],
  imports: [
    CommonModule,
    A11yModule,
    PortalModule,
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
    PageRoutingModule
  ],
})
export class PageModule {}