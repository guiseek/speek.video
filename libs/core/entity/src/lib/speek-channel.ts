export class SpeekChannel {
  sender: RTCDataChannel
  receiver: RTCDataChannel
  constructor(
    peer: RTCPeerConnection,
    label = 'channel',
    config?: RTCDataChannelInit
  ) {
    this.sender = peer.createDataChannel(label, config)
    peer.addEventListener('datachannel', ({ channel }) => {
      channel.addEventListener('message', ({ data }) => {
        console.log(data)
      })
      channel.addEventListener('open', () => {
        console.log('open')
        channel.send('oi')
      })
      this.receiver = channel
    })
    this.sender.addEventListener('open', () => {
      console.log('open')
      this.sender.send('oi')
    })
    this.sender.addEventListener('open', () => null)
  }
}
