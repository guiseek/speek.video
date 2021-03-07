import { BehaviorSubject, Subject } from 'rxjs'

export type PeerDataState = 'closed' | 'creating' | 'opened'
export type PeerDataMessageType = 'message' | 'file'

export class PeerDataMessage {
  constructor(
    public from: string,
    public type: PeerDataMessageType,
    public data: File | string
  ) {}

  static toString({ from, type, data }: PeerDataMessage) {
    return JSON.stringify({ from, type, data })
  }

  static toMessage(data: string): PeerDataMessage {
    return JSON.parse(data)
  }
}

export class PeerDataAdapter {
  private _sender: RTCDataChannel
  private _receiver: RTCDataChannel

  private _state = new BehaviorSubject<PeerDataState>('closed')
  readonly state$ = this._state.asObservable()

  private _error = new Subject<RTCErrorEvent>()
  readonly error$ = this._error.asObservable()

  private _file = new Subject<PeerDataMessage>()
  readonly file$ = this._file.asObservable()

  private _message = new Subject<PeerDataMessage>()
  readonly message$ = this._message.asObservable()

  constructor(connection: RTCPeerConnection) {
    this._sender = connection.createDataChannel('send')
    this._state.next('creating')

    connection.addEventListener('datachannel', ({ channel }) => {
      console.log(channel)
      const receiver = channel
      receiver.addEventListener('open', () => this._state.next('opened'))
      receiver.addEventListener('close', () => this._state.next('closed'))
      receiver.addEventListener('error', () => this._state.next('closed'))
      receiver.addEventListener('message', ({ data }) => {
        console.log(data)
        const message = PeerDataMessage.toMessage(data)
        switch (message.type) {
          case 'file': {
            this._file.next(message)
            break
          }
          case 'message': {
            this._message.next(message)
            break
          }
        }
      })
      this._receiver = receiver
    })

    this._sender.addEventListener('message', ({ data }) => {
      this._message.next(data)
    })
  }

  send(data: PeerDataMessage) {
    this._sender.send(PeerDataMessage.toString(data))
  }

  sendFile(file: File) {
    this._sender.send(file)
  }
}
