import { SpeekPeerEvent } from './speek-peer-event'
import * as io from 'socket.io-client'

export class SpeekPeer {
  conn: RTCPeerConnection
  event: SpeekPeerEvent

  socket: SocketIOClient.Socket

  constructor(private config: RTCConfiguration, private endpoint: string) {
    this.conn = new RTCPeerConnection(config)
    this.event = new SpeekPeerEvent(this.conn)

    this.socket = io(endpoint)
  }

  async offer(opts?: RTCOfferOptions) {
    const offer = await this.conn.createOffer(opts)
    await this.conn.setLocalDescription(offer)

    this.socket.emit('offer', { offer })
  }
}
