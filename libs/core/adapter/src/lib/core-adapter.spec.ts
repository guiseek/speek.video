import { SignalingFactory, PeerFactory, StreamFactory } from './core-adapter'

const config = {
  signaling: {
    url: '',
  },
  peer: {},
  stream: {
    video: true,
  },
}

describe('SignalingFactory', () => {
  it('should work', () => {
    expect(SignalingFactory(config.signaling)).toEqual('core-adapter')
  })
})

describe('PeerFactory', () => {
  it('should work', () => {
    expect(PeerFactory(config.peer)).toEqual('core-adapter')
  })
})

describe('StreamFactory', () => {
  it('should work', () => {
    expect(StreamFactory(config.stream)).toEqual('core-adapter')
  })
})
