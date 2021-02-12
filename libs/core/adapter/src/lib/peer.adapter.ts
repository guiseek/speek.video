import { Observable } from 'rxjs'

export type PeerConfig = RTCConfiguration

export class PeerAdapter {
  connection: RTCPeerConnection
  onChange: Observable<RTCPeerConnection>
  onCandidate: Observable<RTCIceCandidate>
  onTrack: Observable<MediaStream>

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
}
