import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { MaterialModule } from './shared/material.module'
import { FormsModule } from './shared/forms/forms.module'
import { DialModule } from './shared/dial/dial.module'
import { NavbarModule } from './navbar/navbar.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { createSpeekIcon } from './utils/speek-icon'
import { PeerAdapter, SignalingAdapter } from './adapters'
import { SetupComponent } from './pages/setup/setup.component'
import { DialUpComponent } from './pages/dial-up/dial-up.component'
import { PortalModule } from '@angular/cdk/portal'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dial-up', component: DialUpComponent },
  { path: 'setup/:room', component: SetupComponent },
  { path: ':room', component: RoomComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    SetupComponent,
    DialUpComponent,
  ],
  imports: [
    PortalModule,
    FormsModule,
    DialModule,
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      initialNavigation: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
    NavbarModule,
    BrowserAnimationsModule,
  ],
  providers: [PeerAdapter, SignalingAdapter],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    readonly iconRegistry: MatIconRegistry,
    readonly sanitizer: DomSanitizer
  ) {
    createSpeekIcon(iconRegistry, sanitizer)
  }
}
