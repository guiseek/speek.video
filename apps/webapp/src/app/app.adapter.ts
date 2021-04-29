import { inject, InjectionToken, Provider } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import {
  PeerConfig,
  PeerAdapter,
  PeerFactory,
  StreamConfig,
  StreamAdapter,
  StreamFactory,
  SignalingConfig,
  SignalingAdapter,
  SignalingFactory,
  PermissionsAdapter,
  PermissionsFactory,
} from '@speek/core/adapter'

export const PEER_CONFIG_TOKEN = new InjectionToken<PeerConfig>('PeerConfig')
export class PeerProvider {
  static withConfig(config: RTCConfiguration): Provider[] {
    return [
      { provide: PEER_CONFIG_TOKEN, useValue: config },
      {
        provide: PeerAdapter,
        useFactory: PeerFactory,
        deps: [PEER_CONFIG_TOKEN],
      },
    ]
  }
}

export const STREAM_CONFIG_TOKEN = new InjectionToken<StreamConfig>(
  'StreamConfig'
)
export class StreamProvider {
  static withConfig(config: StreamConfig): Provider[] {
    return [
      { provide: STREAM_CONFIG_TOKEN, useValue: config },
      {
        provide: StreamAdapter,
        useFactory: StreamFactory,
        deps: [STREAM_CONFIG_TOKEN],
      },
    ]
  }
}

export const SIGNALING_CONFIG_TOKEN = new InjectionToken<SignalingConfig>(
  'SignalingConfig'
)
export class SignalingProvider {
  static withConfig(config: SignalingConfig): Provider[] {
    return [
      { provide: SIGNALING_CONFIG_TOKEN, useValue: config },
      {
        provide: SignalingAdapter,
        useFactory: SignalingFactory,
        deps: [SIGNALING_CONFIG_TOKEN],
      },
    ]
  }
}

export const WINDOW = new InjectionToken<Window>(
  'Abstração para o objeto global window',
  {
    factory: () => {
      const { defaultView } = inject(DOCUMENT)

      if (!defaultView) {
        throw new Error('Window is not available')
      }

      return defaultView
    },
  }
)

export const NAVIGATOR = new InjectionToken<Navigator>(
  'Abstração para o objeto window.navigator',
  {
    factory: () => inject(WINDOW).navigator,
  }
)

export const PERMISSIONS = new InjectionToken<Permissions>(
  'Abstração para o objeto window.navigator.permissions',
  {
    factory: () => inject(NAVIGATOR).permissions,
  }
)

export const PERMISSIONS_SUPPORT = new InjectionToken<boolean>(
  'Tem suporte a API Permissions?',
  {
    factory: () => {
      return !!inject(PERMISSIONS)
    },
  }
)

export class PermissionsProvider {
  static forRoot(): Provider[] {
    return [
      {
        provide: PermissionsAdapter,
        useFactory: PermissionsFactory,
        deps: [PERMISSIONS],
      },
    ]
  }
}
