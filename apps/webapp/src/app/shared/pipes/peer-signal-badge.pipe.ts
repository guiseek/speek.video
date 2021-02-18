import { Pipe, PipeTransform } from '@angular/core'
import { peerSignalBadge } from '@speek/core/adapter'

@Pipe({ name: 'peerSignalBadge' })
export class PeerSignalBadgePipe implements PipeTransform {
  transform(value: RTCSignalingState): string {
    return peerSignalBadge[value] ?? value
  }
}
