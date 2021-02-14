import { DialupComponent } from './pages/dialup/dialup.component'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { HallComponent } from './pages/hall/hall.component'
import { VoiceComponent } from './pages/voice/voice.component'
import { InviteComponent } from './pages/invite/invite.component'
import { InviteGuard } from './pages/invite/invite.guard'
import { RoomGuard } from './pages/room/room.guard'
import { HallGuard } from './pages/hall/hall.guard'
import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dialup', component: DialupComponent },
  { path: 'voice', component: VoiceComponent },
  { path: 'invite', canActivate: [InviteGuard], component: InviteComponent },
  { path: ':code', canActivate: [RoomGuard], component: RoomComponent },
  { path: ':code/hall', canDeactivate: [HallGuard], component: HallComponent },
]
