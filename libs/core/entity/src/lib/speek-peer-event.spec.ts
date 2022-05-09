import { SpeekPeerEvent } from './speek-peer-event'

const peer = new RTCPeerConnection({})

describe('SpeekPeerEvent', () => {
  it('should create an instance', () => {
    expect(new SpeekPeerEvent(peer)).toBeTruthy()
  })
})
