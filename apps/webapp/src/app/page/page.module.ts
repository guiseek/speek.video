import { MaterialModule } from '../shared/material.module'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ReactiveFormsModule } from '@angular/forms'
import { PageRoutingModule } from './page.routing'
import { LayoutModule } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { A11yModule } from '@angular/cdk/a11y'
import { NgModule } from '@angular/core'
import {
  DoorModule,
  ShareModule,
  SplashModule,
  ToolbarModule,
} from '@speek/ui/components'
import { PeerStateBadgePipe, PeerSignalBadgePipe } from '../shared/pipes'
import { InviteComponent } from './invite/invite.component'
import { DialupComponent } from './dialup/dialup.component'
import { CreateComponent } from './create/create.component'
import { HomeComponent } from './home/home.component'
import { RoomComponent } from './room/room.component'
import { MeetComponent } from './meet/meet.component'

@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    DialupComponent,
    CreateComponent,
    InviteComponent,
    MeetComponent,
    PeerStateBadgePipe,
    PeerSignalBadgePipe,
  ],
  imports: [
    CommonModule,
    A11yModule,
    SplashModule,
    DoorModule,
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
