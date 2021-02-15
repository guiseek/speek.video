export const environment = {
  production: true,
  gateway: {
    url: 'https://localhost:3333'
  },
  configs: {
    iceServers: [{ urls: 'stun:stun.stunprotocol.org:3478' }],
  },
  constraints: {
    audio: {
      channelCount: {
        ideal: 1,
      },
      echoCancellation: true,
      frameRate: {
        ideal: 22000,
      },
    },
    video: {
      width: {
        min: 480,
        max: 1280,
        ideal: 1280,
      },
      height: {
        min: 320,
        max: 720,
        ideal: 720,
      },
      facingMode: {
        ideal: 'user',
      },
      frameRate: {
        ideal: 60,
        min: 10,
      },
    },
  },
}
