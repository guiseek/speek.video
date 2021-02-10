import { environment } from './../../environments/environment'

export class StreamAdapter {
  public currentStream: MediaStream

  getStream(constraints?: MediaStreamConstraints) {
    return navigator.mediaDevices.getUserMedia(
      constraints ? constraints : environment.constraints
    )
  }

  stopStream(): void {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach((t) => t.stop())
    }
  }

  async getDevices(deviceKind?: MediaDeviceKind) {
    const filter = ({ kind }: MediaDeviceInfo) => kind === deviceKind
    const devices = await navigator.mediaDevices.enumerateDevices()
    return deviceKind ? devices.filter(filter) : devices
  }

  getDisplay(): Promise<MediaStream> {
    const configuration = { video: true }
    const mediaDevices = navigator.mediaDevices
    if ('getDisplayMedia' in navigator) {
      return (navigator as any).getDisplayMedia(configuration)
    } else if ('getDisplayMedia' in mediaDevices) {
      return (mediaDevices as any).getDisplayMedia(configuration)
    } else {
      return mediaDevices.getUserMedia({
        video: { mediaSourcee: 'screen' },
      } as MediaStreamConstraints)
    }
  }
}
