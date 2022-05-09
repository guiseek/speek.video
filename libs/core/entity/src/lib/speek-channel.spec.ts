import { SpeekChannel } from './speek-channel'

const peer = new RTCPeerConnection({})

describe('SpeekChannel', () => {
  it('should create an instance', () => {
    expect(new SpeekChannel(peer, '')).toBeTruthy()
  })
})
