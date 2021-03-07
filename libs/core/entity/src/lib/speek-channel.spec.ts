import { SpeekChannel } from './speek-channel'

const peerMock: Partial<RTCPeerConnection> = {
  createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit) {
    return {
      send(data: string) {},
      addEventListener(type: string, listener: any) {},
    } as RTCDataChannel
  },
  addEventListener(type: string, listener: any) {},
}

describe('SpeekChannel', () => {
  it('should create an instance', () => {
    expect(new SpeekChannel(peerMock as RTCPeerConnection, '')).toBeTruthy()
  })
})
