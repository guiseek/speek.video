import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { RouterModule, Routes } from '@angular/router'
import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'

import { UiComponentsModule, NavbarModule, WaveModule } from '@speek/ui/components'
import { MaterialModule } from './shared/material.module'
import { FormsModule } from './shared/forms/forms.module'
import { DialModule } from './shared/dial/dial.module'
import { PeerAdapter, SignalingAdapter, StreamAdapter } from './adapters'
import { DialUpComponent } from './pages/dial-up/dial-up.component'
import { HomeComponent } from './pages/home/home.component'
import { RoomComponent } from './pages/room/room.component'
import { SetupComponent } from './pages/setup/setup.component'
import { createSpeekIcon } from '@speek/util/format'
import { PortalModule } from '@angular/cdk/portal'
import { AppComponent } from './app.component'
import { routes } from './app.routing';
import { HallComponent } from './pages/hall/hall.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    SetupComponent,
    DialUpComponent,
    HallComponent,
  ],
  imports: [
    PortalModule,
    WaveModule,
    NavbarModule,
    LayoutModule,
    FormsModule,
    DialModule,
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
  providers: [PeerAdapter, SignalingAdapter, StreamAdapter],
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
