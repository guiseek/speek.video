import { Subject } from 'rxjs'

export class PeerDataAdapter {
  private _message = new Subject()
  readonly message$ = this._message.asObservable()
  constructor(readonly channel: RTCDataChannel) {
    channel.addEventListener('message', ({ data }) => {
      this._message.next(data)
    })
  }

  send(data: any) {
    this.channel.send(JSON.stringify(data))
  }
}
