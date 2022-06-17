import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { Observable, Subject } from 'rxjs'
import { io, Socket } from 'socket.io-client'

export interface SignalingConfig {
  url: string
  options?: any
}

export class SignalingAdapter {
  private message = new Subject<SpeekPayload>()
  onMessage = this.message.asObservable()

  io: Socket

  constructor(config: SignalingConfig) {
    this.io = io(config.url)
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
