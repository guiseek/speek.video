export type UserPermissions = Pick<
  Record<PermissionName, PermissionState>,
  'camera' | 'speaker' | 'microphone'
>

export type UserDevices = Partial<
  Record<MediaDeviceKind, Omit<MediaDeviceInfo, 'toJSON'>>
>

export class UserSetup {
  pitch: number
  audio: Omit<MediaDeviceInfo, 'toJSON'>
  video: Omit<MediaDeviceInfo, 'toJSON'>
  constructor(setup?: Partial<UserSetup>) {
    if (setup) {
      this.pitch = setup.pitch ?? 0
      this.audio = setup.audio ?? null
      this.video = setup.video ?? null
    }
  }

  static fromJson(json: UserSetup) {
    return new UserSetup(json)
  }

  serialize() {
    return {
      pitch: this.pitch,
      audio: this.audio,
      video: this.video,
    }
  }

  toJSON() {
    return {
      pitch: this.pitch,
      audio: this.audio,
      video: this.video,
    }
  }
}
