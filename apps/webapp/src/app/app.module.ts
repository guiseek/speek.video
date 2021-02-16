import { PeerProvider, SignalingProvider, StreamProvider } from './app.adapter'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { A11yModule } from '@angular/cdk/a11y'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { DrawerModule, UiComponentsModule } from '@speek/ui/components'
import { createSpeekIcon, getFire, getLogo } from '@speek/util/format'
import { UserSetupStorage, UserRoomStorage } from '@speek/data/storage'
import { ServiceWorkerModule } from '@angular/service-worker'
import { UserSetupAdapter } from '@speek/core/adapter'
import { AppComponent } from './app.component'

import { environment } from './../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    A11yModule,
    DrawerModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./page/page.module').then((m) => m.PageModule),
        },
      ],
      {
        useHash: true,
        initialNavigation: 'enabled',
        relativeLinkResolution: 'legacy',
      }
    ),
    UiComponentsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    UserRoomStorage,
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
    const name = 'speek-logo'
    const icon = getLogo('#ffffff')
    createSpeekIcon(iconRegistry, sanitizer, [icon, name])
  }
}
