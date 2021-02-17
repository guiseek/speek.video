import { DialupComponent } from './dialup/dialup.component'
import { InviteComponent } from './invite/invite.component'
import { CreateComponent } from './create/create.component'
import { MeetComponent } from './meet/meet.component'
import { HomeComponent } from './home/home.component'
import { RoomComponent } from './room/room.component'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { InviteGuard } from './invite/invite.guard'
import { MeetGuard } from './meet/meet.guard'
import { RoomGuard } from './room/room.guard'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent },
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
        redirectTo: ':code/meet',
      },
      {
        path: ':code/room',
        canActivate: [RoomGuard],
        canDeactivate: [RoomGuard],
        component: RoomComponent,
      },
      {
        path: ':code/meet',
        canActivate: [MeetGuard],
        canDeactivate: [MeetGuard],
        component: MeetComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PageRoutingModule {}
