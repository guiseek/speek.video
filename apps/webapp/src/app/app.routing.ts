import { DialUpComponent } from './pages/dial-up/dial-up.component'
import { SetupComponent } from './pages/setup/setup.component'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { RoomGuard } from './pages/room/room.guard'
import { Routes } from '@angular/router'
import { HallComponent } from './pages/hall/hall.component'
import { HallGuard } from './pages/hall/hall.guard'

export const routes: Routes = [
  { path: '', component: HomeComponent, data: {} },
  { path: 'dial-up', component: DialUpComponent },
  { path: 'setup/:room', component: SetupComponent },
  { path: ':code/hall', canActivate: [HallGuard], component: HallComponent },
  { path: ':code', canActivate: [RoomGuard], component: RoomComponent },
]
