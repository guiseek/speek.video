import { environment } from './../../environments/environment'
import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { Observable, Subject } from 'rxjs'
import * as io from 'socket.io-client'

export class SignalingAdapter {
  private message = new Subject<SpeekPayload>()
  onMessage = this.message.asObservable()

  io: SocketIOClient.Socket
  constructor() {
    this.io = io(environment.gateway)
  }

  on(action: SpeekAction) {
    return new Observable<SpeekPayload>((subscribe) => {
      this.io.on(action, (data: SpeekPayload) => subscribe.next(data))
    })
  }

  send(action: SpeekAction, payload: SpeekPayload) {
    this.io.emit(action, payload)
  }
}
