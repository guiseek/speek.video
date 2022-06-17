import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { A11yModule } from '@angular/cdk/a11y'
import { RouterModule } from '@angular/router'
import { Inject, NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { LayoutModule } from '@angular/cdk/layout'
import { WebApplication } from 'schema-dts'
import { UserSetupStorage, UserRoomStorage } from '@speek/data/storage'
import { DrawerModule, UiComponentsModule } from '@speek/ui/components'
import { createSpeekIcon, getLogo } from '@speek/util/format'
import { UserSetupAdapter } from '@speek/core/adapter'
import { createJsonLdScript } from '@speek/util/share'

import {
  PermissionsProvider,
  SignalingProvider,
  StreamProvider,
} from './app.adapter'
import { environment } from './../environments/environment'
import { PeerSignalBadgePipe, PeerStateBadgePipe } from './shared/pipes'
import { MaterialModule } from './shared/material.module'
import { SettingComponent } from './setting/setting.component'
import { AudioDialog } from './setting/audio/audio.dialog'
import { VideoDialog } from './setting/video/video.dialog'
import { HomeComponent } from './home/home.component'
import { MeetComponent } from './meet/meet.component'
import { AppComponent } from './app.component'
import { MeetGuard } from './meet/meet.guard'
import { AppSound } from './app.sound'
import {
  AudioModule,
  ShareModule,
  SplashModule,
  ToolbarModule,
} from '@speek/ui/components'
import { DOCUMENT } from '@angular/common'

@NgModule({
  declarations: [
    AudioDialog,
    VideoDialog,
    AppComponent,
    HomeComponent,
    MeetComponent,
    SettingComponent,
    PeerStateBadgePipe,
    PeerSignalBadgePipe,
  ],
  imports: [
    A11yModule,
    DrawerModule,
    BrowserModule,
    DragDropModule,
    ToolbarModule,
    SplashModule,
    AudioModule,
    ShareModule,
    LayoutModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        {
          path: 'invite',
          component: HomeComponent,
        },
        {
          path: 'setting',
          component: SettingComponent,
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
      ],
      {
        useHash: true,
      }
    ),
    UiComponentsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    AppSound,
    UserRoomStorage,
    UserSetupStorage,
    UserSetupAdapter,
    PermissionsProvider.forRoot(),
    StreamProvider.withConfig(environment.constraints),
    SignalingProvider.withConfig(environment.gateway),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    readonly iconRegistry: MatIconRegistry,
    readonly sanitizer: DomSanitizer,
    @Inject(DOCUMENT) readonly document: Document
  ) {
    const name = 'speek-logo'
    const icon = getLogo('#999')
    createSpeekIcon(iconRegistry, sanitizer, [icon, name])
    this.appendJsonLd(document.head)
  }

  appendJsonLd<T extends HTMLElement>(parent: T) {
    const scriptJsonLd = createJsonLdScript<WebApplication>({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Speek - Simples e seguro',
      about: 'Crie um link para conversar e pronto.',
      description:
        'Sua ligação funciona pessoa pra pessoa, sem servidores, sem persistência, direto ao ponto.',
      additionalType: 'Liberdade em áudio e vídeo',
      url: 'https://speek.video',
    })
    parent.appendChild(scriptJsonLd)
  }
}
