import { InjectionToken, Provider } from '@angular/core'
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
