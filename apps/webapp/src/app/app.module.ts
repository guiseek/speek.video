import {
  PeerProvider,
  PermissionsProvider,
  SignalingProvider,
  StreamProvider,
} from './app.adapter'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { A11yModule } from '@angular/cdk/a11y'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { DrawerModule, UiComponentsModule } from '@speek/ui/components'
import { UserSetupStorage, UserRoomStorage } from '@speek/data/storage'
import { createSpeekIcon, getLogo } from '@speek/util/format'
import { ServiceWorkerModule } from '@angular/service-worker'
import { MaterialModule } from './shared/material.module'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { UserSetupAdapter } from '@speek/core/adapter'
import { LayoutModule } from '@angular/cdk/layout'

import { environment } from './../environments/environment'
import { PeerSignalBadgePipe, PeerStateBadgePipe } from './shared/pipes'
import { MeetAddonDirective } from './meet/meet-addon.directive'
import { SettingComponent } from './setting/setting.component'
import { AudioDialog } from './setting/audio/audio.dialog'
import { VideoDialog } from './setting/video/video.dialog'
import { HomeComponent } from './home/home.component'
import { MeetComponent } from './meet/meet.component'
import { RoomComponent } from './room/room.component'
import { AppComponent } from './app.component'
import { RoomGuard } from './room/room.guard'
import { MeetGuard } from './meet/meet.guard'
import { AppSound } from './app.sound'
import {
  AudioModule,
  ShareModule,
  SplashModule,
  ToolbarModule,
} from '@speek/ui/components'
import { VoiceComponent } from './voice/voice.component'

@NgModule({
  declarations: [
    AudioDialog,
    VideoDialog,
    AppComponent,
    HomeComponent,
    MeetComponent,
    SettingComponent,
    MeetAddonDirective,
    PeerStateBadgePipe,
    PeerSignalBadgePipe,
    RoomComponent,
    VoiceComponent,
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
          path: ':code/room',
          canActivate: [RoomGuard],
          canDeactivate: [RoomGuard],
          component: RoomComponent,
        },
        {
          path: ':code/voice',
          canActivate: [RoomGuard],
          canDeactivate: [RoomGuard],
          component: VoiceComponent,
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
    PeerProvider.withConfig(environment.configs),
    StreamProvider.withConfig(environment.constraints),
    SignalingProvider.withConfig(environment.gateway),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    readonly iconRegistry: MatIconRegistry,
    readonly sanitizer: DomSanitizer
  ) {
    const name = 'speek-logo'
    const icon = getLogo('#999')
    createSpeekIcon(iconRegistry, sanitizer, [icon, name])
  }
}
