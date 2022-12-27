import { PeerDataAdapter } from './peer-data.adapter'
import { SpeekMessage, SpeekError } from '@speek/core/entity'
import { Observable, Subject } from 'rxjs'

function stereoOpus({ type, sdp }: RTCSessionDescriptionInit) {
  sdp = sdp.replace(/a=fmtp:111/, 'a=fmtp:111 stereo=1\r\na=fmtp:111')
  return { type, sdp }
}

function maxMessageSize({ type, sdp }: RTCSessionDescriptionInit) {
  sdp = sdp.replace(/a=max-message-size:262144/, 'a=max-message-size:65535')
  return { type, sdp }
}

export type PeerConfig = RTCConfiguration
export class PeerAdapter {
  connection: RTCPeerConnection
  sendChannel: RTCDataChannel
  receiveChannel: RTCDataChannel

  isOffer = true

  _onMessage = new Subject<SpeekMessage>()
  onMessage = this._onMessage.asObservable()

  onSignal: Observable<RTCSignalingState>
  onChange: Observable<RTCPeerConnection>
  onState: Observable<RTCPeerConnectionState>
  onCandidate: Observable<RTCIceCandidate>
  onNegotiationNeeded: Observable<any>
  onTrack: Observable<MediaStream>
  onError: Observable<SpeekError>
  onStreams: Observable<readonly MediaStream[]>

  constructor(config: PeerConfig) {
    this.connection = new RTCPeerConnection(config)
    // this.sendChannel = new RTCDataChannel()

    this.onState = new Observable((subscriber) => {
      this.connection.addEventListener('connectionstatechange', () => {
        subscriber.next(this.connection.connectionState)
      })
    })

    this.onSignal = new Observable<RTCSignalingState>((subscriber) => {
      this.connection.addEventListener('signalingstatechange', ({ target }) =>
        subscriber.next((target as RTCPeerConnection).signalingState)
      )
    })

    this.onCandidate = new Observable<RTCIceCandidate>((subscriber) => {
      this.connection.addEventListener('icecandidate', ({ candidate }) =>
        subscriber.next(candidate)
      )
    })

    this.onTrack = new Observable<MediaStream>((subscriber) => {
      this.connection.addEventListener('track', ({ streams }) =>
        subscriber.next(streams[0])
      )
    })

    this.onNegotiationNeeded = new Observable((subscriber) => {
      this.connection.addEventListener('negotiationneeded', (ev) => {
        subscriber.next(ev)
      })
    })

    this.onStreams = new Observable<readonly MediaStream[]>((subscriber) => {
      this.connection.addEventListener('track', ({ streams }) =>
        subscriber.next(streams)
      )
    })

    this.onError = new Observable((subscriber) => {
      this.connection.addEventListener(
        'icecandidateerror',
        (ev: RTCPeerConnectionIceErrorEvent) => {
          subscriber.next({
            error: new Error(`Code: ${ev.errorCode}: ${ev.errorText}`),
            description: `Type: ${ev.type}. URL: ${ev.url} at ${ev.timeStamp}`,
            component: 'PeerAdapter',
          })
        }
      )
    })
  }

  createOffer = (options?: RTCOfferOptions) => {
    return new Promise<RTCSessionDescription>((resolve, reject) => {
      this.connection
        .createOffer(options)
        // .then((sdp) => this.connection.setLocalDescription(maxMessageSize(sdp)))
        .then((sdp) => this.connection.setLocalDescription(sdp))
        .then(() => resolve(this.connection.localDescription))
        .catch((err) => reject(err))
    })
  }

  createAnswer = (options?: RTCSessionDescription) => {
    return new Promise<RTCSessionDescription>((resolve, reject) => {
      this.isOffer = false
      this.connection
        .setRemoteDescription(options)
        .then(() => this.connection.createAnswer())
        .then((sdp) => this.connection.setLocalDescription(sdp))
        .then(() => resolve(this.connection.localDescription))
        .catch((err) => reject(err))
    })
  }

  setRemote(description?: RTCSessionDescription) {
    return this.connection.setRemoteDescription(
      new RTCSessionDescription(description)
    )
  }

  addCandidate = (candidate: RTCIceCandidate) => {
    return this.connection.addIceCandidate(new RTCIceCandidate(candidate))
  }

  addStream(stream: MediaStream): void {
    stream
      .getTracks()
      .forEach((track) => this.connection.addTrack(track, stream))
  }
}
