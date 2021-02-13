import { stopStream } from './stop-stream'

class MediaStreamTrackMock implements MediaStreamTrack {
  enabled: boolean
  id: string
  isolated: boolean
  kind: string
  label: string
  muted: boolean
  onended: (this: MediaStreamTrack, ev: Event) => any
  onisolationchange: (this: MediaStreamTrack, ev: Event) => any
  onmute: (this: MediaStreamTrack, ev: Event) => any
  onunmute: (this: MediaStreamTrack, ev: Event) => any
  readyState: MediaStreamTrackState
  applyConstraints(constraints?: MediaTrackConstraints): Promise<void> {
    return Promise.resolve()
  }
  clone(): MediaStreamTrack {
    return this
  }
  getCapabilities(): MediaTrackCapabilities {
    return {
      aspectRatio: {},
      autoGainControl: [true],
      channelCount: {},
      deviceId: '',
      echoCancellation: [true],
      facingMode: [''],
      frameRate: {},
      groupId: '',
      height: {},
      latency: {},
      noiseSuppression: [true],
      resizeMode: [''],
      sampleRate: {},
      sampleSize: {},
      width: {},
    }
  }
  getConstraints(): MediaTrackConstraints {
    return {}
  }
  getSettings(): MediaTrackSettings {
    return {}
  }
  stop(): void {}
  addEventListener<K extends 'ended' | 'isolationchange' | 'mute' | 'unmute'>(
    type: K,
    listener: (this: MediaStreamTrack, ev: MediaStreamTrackEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(type: any, listener: any, options?: any) {
    throw new Error('Method not implemented.')
  }
  removeEventListener<
    K extends 'ended' | 'isolationchange' | 'mute' | 'unmute'
  >(
    type: K,
    listener: (this: MediaStreamTrack, ev: MediaStreamTrackEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(type: any, listener: any, options?: any) {}
  dispatchEvent(event: Event): boolean {
    return true
  }
}

class MediaStreamMock implements MediaStream {
  active: boolean
  id: string
  onaddtrack: (this: MediaStream, ev: MediaStreamTrackEvent) => any
  onremovetrack: (this: MediaStream, ev: MediaStreamTrackEvent) => any
  addTrack = (track: MediaStreamTrack) => jest.fn()
  clone(): MediaStream {
    return this
  }
  getAudioTracks(): MediaStreamTrackMock[] {
    return [new MediaStreamTrackMock()]
  }
  getTrackById(trackId: string): MediaStreamTrackMock {
    return new MediaStreamTrackMock()
  }
  getTracks(): MediaStreamTrack[] {
    return [new MediaStreamTrackMock()]
  }
  getVideoTracks(): MediaStreamTrack[] {
    return [new MediaStreamTrackMock()]
  }
  removeTrack(track: MediaStreamTrack): void {}
  addEventListener<K extends 'addtrack' | 'removetrack'>(
    type: K,
    listener: (this: MediaStream, ev: MediaStreamEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(type: any, listener: any, options?: any) {}
  removeEventListener<K extends 'addtrack' | 'removetrack'>(
    type: K,
    listener: (this: MediaStream, ev: MediaStreamEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(type: any, listener: any, options?: any) {}
  dispatchEvent(event: Event): boolean {
    return true
  }
}

describe('stopStream', () => {
  it('should create an instance', () => {
    expect(stopStream(new MediaStreamMock())).toBeTruthy()
  })
})
