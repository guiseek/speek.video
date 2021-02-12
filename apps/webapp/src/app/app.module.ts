import { PeerProvider, SignalingProvider, StreamProvider } from './app.adapter'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { LayoutModule } from '@angular/cdk/layout'
import { RouterModule} from '@angular/router'
import { NgModule } from '@angular/core'

import { environment } from './../environments/environment'
import { DialupComponent } from './pages/dialup/dialup.component'
import { CreateComponent } from './pages/create/create.component'
import { MaterialModule } from './shared/material.module'
import { FormsModule } from './shared/forms/forms.module'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { SetupComponent } from './pages/setup/setup.component'
import { HallComponent } from './pages/hall/hall.component'
import { createSpeekIcon } from '@speek/util/format'
import { PortalModule } from '@angular/cdk/portal'
import { AppComponent } from './app.component'
import { routes } from './app.routing'
import {
  UiComponentsModule,
  NavbarModule,
  WaveModule,
  NetworkModule,
  DoorModule,
  DialpadModule,
} from '@speek/ui/components'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    SetupComponent,
    HallComponent,
    DialupComponent,
    CreateComponent,
  ],
  imports: [
    PortalModule,
    WaveModule,
    DoorModule,
    DialpadModule,
    NetworkModule,
    NavbarModule,
    LayoutModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      initialNavigation: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
    UiComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    PeerProvider.config(environment.configs),
    StreamProvider.config(environment.constraints),
    SignalingProvider.config(environment.gateway),
  ],
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
