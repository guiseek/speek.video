export type SpeekPeerEventMap = {
  error: RTCErrorEvent | RTCError
  offer: RTCSessionDescription
  answer: RTCSessionDescription
  candidate: RTCIceCandidate
  track: RTCTrackEvent
  channel: RTCDataChannel
  state: RTCSignalingState
  data: ArrayBuffer
  message: string
}

type Callback<T> = (value: T) => void

export type SpeekPeerEventMapped<K extends keyof SpeekPeerEventMap> = Map<
  K,
  Callback<SpeekPeerEventMap[K]>
>

export class SpeekPeerEvent {
  mapped: SpeekPeerEventMapped<keyof SpeekPeerEventMap>

  constructor(private readonly peer: RTCPeerConnection) {
    this.mapped = new Map()

    this.peer.onicecandidate = (event) => {
      const onCandidate = this.mapped.get('candidate')
      if (onCandidate) onCandidate(event.candidate)
    }

    this.peer.onsignalingstatechange = (event) => {
      const onState = this.mapped.get('state')
      if (onState) onState(this.peer.signalingState)
    }

    this.peer.oniceconnectionstatechange = (event) => {
      const onState = this.mapped.get('state')
      if (onState) onState(this.peer.iceConnectionState)
    }

    this.peer.ontrack = (track) => {
      const onTrack = this.mapped.get('track')
      if (onTrack) onTrack(track)
    }

    this.peer.ondatachannel = ({ channel }) => {
      const onChannel = this.mapped.get('channel')
      if (onChannel) onChannel(channel)
    }
  }

  on<K extends keyof SpeekPeerEventMap>(
    key: K,
    fn: Callback<SpeekPeerEventMap[K]>
  ) {
    this.mapped.set(key, fn)
  }

  get(key: keyof SpeekPeerEventMap) {
    return this.mapped.get(key)
  }
}
