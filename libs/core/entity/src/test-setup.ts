import 'jest-ts-auto-mock'

Object.defineProperty(window, 'RTCPeerConnection', {
  value: class {
    addEventListener = jest.fn()
    removeEventListener = jest.fn()
    createOffer = jest.fn()
    createAnswer = jest.fn()
    setLocalDescription = jest.fn()
    setRemoteDescription = jest.fn()
    addIceCandidate = jest.fn()
    iceGatheringState = 'gathering'
    iceConnectionState = 'connected'
    signalingState = 'stable'
    getSenders = jest.fn()
    getReceivers = jest.fn()
    getStats = jest.fn()
    close = jest.fn()
    onicecandidate = null
    oniceconnectionstatechange = null
    onsignalingstatechange = null
    ontrack = null
    onaddstream = null
    onremovestream = null
    onnegotiationneeded = null
    onconnectionstatechange = null
    ondatachannel = null
    onicegatheringstatechange = null
    onidentityresult = null
    onidentitychange = null
    createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit) {
      return {
        send(data: string) {
          return
        },
        addEventListener(type: string, listener: any) {
          return
        },
      } as RTCDataChannel
    }
    // addEventListener(type: string, listener: any) {},
  },
})
