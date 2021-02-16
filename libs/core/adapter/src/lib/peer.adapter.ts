import { Warning } from '@speek/core/entity'
import { Observable } from 'rxjs'

export type PeerConfig = RTCConfiguration

export class PeerAdapter {
  connection: RTCPeerConnection
  onChange: Observable<RTCPeerConnection>
  onCandidate: Observable<RTCIceCandidate>
  onNegotiationNeeded: Observable<any>
  onTrack: Observable<MediaStream>
  onWarning: Observable<Warning>
  onStreams: Observable<readonly MediaStream[]>

  constructor(config: PeerConfig) {
    this.connection = new RTCPeerConnection(config)

    this.onChange = new Observable<RTCPeerConnection>((subscriber) => {
      this.connection.addEventListener('signalingstatechange', ({ target }) =>
        subscriber.next(target as RTCPeerConnection)
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

    this.onWarning = new Observable((subscriber) => {
      this.connection.addEventListener('icecandidateerror', (ev) => {
        subscriber.next({
          error: new Error(`Code: ${ev.errorCode}: ${ev.errorText}`),
          description: `Type: ${ev.type}. URL: ${ev.url}, HostCandidate: ${ev.hostCandidate}`,
          component: 'PeerAdapter',
        })
      })
    })
  }

  createOffer = (options?: RTCOfferOptions) => {
    return new Promise<RTCSessionDescription>((resolve, reject) => {
      this.connection
        .createOffer(options)
        .then((sdp) => this.connection.setLocalDescription(sdp))
        .then(() => resolve(this.connection.localDescription))
        .catch((err) => reject(err))
    })
  }

  createAnswer = (options?: RTCSessionDescription) => {
    return new Promise<RTCSessionDescription>((resolve, reject) => {
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
