import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CameraComponent } from './camera/camera.component'
import { DialupComponent } from './dialup/dialup.component'
import { HomeComponent } from './home/home.component'
import { RoomComponent } from './room/room.component'
import { HallComponent } from './hall/hall.component'
import { VoiceComponent } from './voice/voice.component'
import { InviteComponent } from './invite/invite.component'
import { CreateComponent } from './create/create.component'

import { InviteGuard } from './invite/invite.guard'
import { RoomGuard } from './room/room.guard'
import { HallGuard } from './hall/hall.guard'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'voice', component: VoiceComponent },
      { path: 'camera', component: CameraComponent },
      { path: 'create', component: CreateComponent },
      { path: 'dialup', component: DialupComponent },
      {
        path: 'invite',
        canActivate: [InviteGuard],
        component: InviteComponent,
      },
      {
        path: 'invite/:code',
        canActivate: [InviteGuard],
        component: InviteComponent,
      },
      {
        path: ':code',
        canActivate: [RoomGuard],
        canDeactivate: [RoomGuard],
        component: RoomComponent,
      },
      {
        path: ':code/hall',
        canDeactivate: [HallGuard],
        component: HallComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PageRoutingModule {}
