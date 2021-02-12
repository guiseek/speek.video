import { DialupComponent } from './pages/dialup/dialup.component'
import { SetupComponent } from './pages/setup/setup.component'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { HallComponent } from './pages/hall/hall.component'
import { RoomGuard } from './pages/room/room.guard'
import { HallGuard } from './pages/hall/hall.guard'
import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dialup', component: DialupComponent },
  // { path: 'new', canDeactivate: [CreateGuard], component: CreateComponent },
  { path: 'hall', canDeactivate: [HallGuard], component: HallComponent },
  { path: 'setup/:room', component: SetupComponent },
  { path: ':code', canActivate: [RoomGuard], component: RoomComponent },
  { path: ':code/hall', canDeactivate: [HallGuard], component: HallComponent },
]
