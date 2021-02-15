import { ClipboardModule } from '@angular/cdk/clipboard'
import { PeerProvider, SignalingProvider, StreamProvider } from './app.adapter'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { LayoutModule } from '@angular/cdk/layout'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { environment } from './../environments/environment'
import { DialupComponent } from './pages/dialup/dialup.component'
import { CreateComponent } from './pages/create/create.component'
import { MaterialModule } from './shared/material.module'
import { FormsModule } from './shared/forms/forms.module'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { HallComponent } from './pages/hall/hall.component'
import { createSpeekIcon, getFire, getLogo } from '@speek/util/format'
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
  AudioModule,
  ShareModule,
  ToolbarModule,
} from '@speek/ui/components'
import { UserSetupAdapter } from '@speek/core/adapter'
import { VoiceComponent } from './pages/voice/voice.component'
import { InviteComponent } from './pages/invite/invite.component'
import { UserSetupStorage } from './shared/data/user-setup.storage'
import { A11yModule } from '@angular/cdk/a11y';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CameraComponent } from './pages/camera/camera.component'

@NgModule({
  declarations: [
    AppComponent,
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
    A11yModule,
    PortalModule,
    WaveModule,
    ShareModule,
    ToolbarModule,
    DoorModule,
    AudioModule,
    DialpadModule,
    NetworkModule,
    NavbarModule,
    LayoutModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      initialNavigation: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
    UiComponentsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    UserSetupStorage,
    UserSetupAdapter,
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
    createSpeekIcon(iconRegistry, sanitizer, [getFire('#d32f2f'), 'speek-dark'])
    createSpeekIcon(iconRegistry, sanitizer, [
      getFire('#03a9f4'),
      'speek-light',
    ])
    createSpeekIcon(iconRegistry, sanitizer, [getLogo('#ffffff'), 'speek-logo'])
  }
}
