import { FormControl, FormGroup } from '@angular/forms'

export class AudioSettingForm extends FormGroup {
  constructor(constraints: MediaTrackConstraints = {}) {
    super({
      deviceId: new FormControl(''),
      channelCount: new FormGroup({ ideal: new FormControl(1) }),
      echoCancellation: new FormControl(true),
      frameRate: new FormGroup({ ideal: new FormControl(22000) }),
    })
    this.patchValue(constraints)
  }
  get deviceId() {
    return this.get('deviceId') as FormControl
  }
  get channelCount() {
    return this.get('channelCount') as FormGroup
  }
  get echoCancellation() {
    return this.get('echoCancellation') as FormControl
  }
  get frameRate() {
    return this.get('frameRate') as FormGroup
  }
}
