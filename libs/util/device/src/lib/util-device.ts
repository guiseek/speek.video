export function utilDevice(): string {
  return 'util-device'
}

type DeviceKind = keyof Omit<MediaStreamConstraints, 'peerIdentity'>
type MediaDeviceConfig = Pick<MediaStreamConstraints, 'video' | 'audio'>

const echoCancellation = { echoCancellation: true }
const noiseSuppression = { noiseSuppression: true }
const defaultAudioConfig = Object.assign(echoCancellation, noiseSuppression)

/**
 *
 *
 * @export
 * @param MediaDeviceInfo device
 * @param DeviceKind kind
 * @returns MediaDeviceConfig
 */
export function configMediaDeviceSource(
  device: MediaDeviceInfo
): MediaTrackConstraints {
  return {
    optional: [{ sourceId: device }],
  } as MediaTrackConstraints
}

export const configAudioSource = (
  device: MediaDeviceInfo
): MediaTrackConstraints => {
  return {
    optional: [{ sourceId: device }],
    echoCancellation: true,
    noiseSuppression: true,
  } as MediaTrackConstraints
}

export function getAudioConfig(deviceId?: string): MediaTrackConstraints {
  return deviceId ? { deviceId, ...defaultAudioConfig } : defaultAudioConfig
}

export const getVideoConfig = (
  deviceId?: string
): MediaTrackConstraints | boolean => {
  return deviceId ? { deviceId } : true
}

export const getMediaDevices = async (params: MediaDeviceKind) => {
  const filter = ({ kind }: MediaDeviceInfo) => kind === params
  const devices = await navigator.mediaDevices.enumerateDevices()
  return params ? devices.filter(filter) : devices
}

export const compareDeviceId = (
  d1: MediaDeviceInfo,
  d2: MediaDeviceInfo
): boolean => {
  return d1 && d2 ? d1.deviceId === d2.deviceId : d1 === d2
}
