import { getMediaDevices, configMediaDeviceSource } from '@speek/util/device'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserSetup } from '@speek/core/entity'

export class UserSetupForm extends FormGroup {
  constructor(value?: Partial<UserSetup>) {
    const { pitch = 0, audio, video } = value ?? {}
    super({
      pitch: new FormControl(pitch, [
        Validators.min(-1.2),
        Validators.max(1.2),
      ]),
      audio: new FormControl(audio),
      video: new FormControl(video),
    })
  }

  getUserSetup() {
    return UserSetup.fromJson(this.value)
  }

  get pitch() {
    return this.get('pitch') as FormControl
  }

  get audio() {
    return this.get('audio') as FormControl
  }

  get video() {
    return this.get('video') as FormControl
  }

  config(device: MediaDeviceInfo) {
    return configMediaDeviceSource(device)
  }

  getDevices(kind: MediaDeviceKind) {
    return getMediaDevices(kind)
  }
}
