export const environment = {
  production: true,
  gateway: {
    url: 'https://gateway.speek.video',
  },
  configs: {
    // iceServers: [{ urls: 'stun:stun.stunprotocol.org:3478' }],
    iceServers: [
      {
        urls: ['stun:3.82.157.149:3478'],
        username: 'speek',
        credential: 'contact',
        credentialType: 'password',
      },
    ],
  } as RTCConfiguration,
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
