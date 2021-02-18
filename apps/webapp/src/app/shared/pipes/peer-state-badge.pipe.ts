import { Pipe, PipeTransform } from '@angular/core'
import { peerStateBadge } from '@speek/core/adapter'

@Pipe({ name: 'peerStateBadge' })
export class PeerStateBadgePipe implements PipeTransform {
  transform(value: RTCPeerConnectionState): string {
    return peerStateBadge[value] ?? value
  }
}
