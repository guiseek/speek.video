import { MeetComponent } from './meet/meet.component'
import { HomeComponent } from './home/home.component'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { MeetGuard } from './meet/meet.guard'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      {
        path: 'invite',
        component: HomeComponent,
      },
      {
        path: 'invite/:code',
        component: HomeComponent,
      },
      {
        path: ':code',
        redirectTo: ':code/meet',
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
