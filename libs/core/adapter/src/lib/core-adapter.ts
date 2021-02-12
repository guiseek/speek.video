import { SignalingAdapter, SignalingConfig } from './signaling.adapter'
import { StreamAdapter, StreamConfig } from './stream.adapter'
import { PeerAdapter, PeerConfig } from './peer.adapter'

export function SignalingFactory(config: SignalingConfig) {
  return new SignalingAdapter(config)
}

export function PeerFactory(config: PeerConfig) {
  return new PeerAdapter(config)
}

export function StreamFactory(config: StreamConfig) {
  return new StreamAdapter(config)
}
