export type UserPermissions = Pick<
  Record<PermissionName, PermissionState>,
  'camera' | 'speaker' | 'microphone'
>

export type UserDevices = Partial<
  Record<MediaDeviceKind, Omit<MediaDeviceInfo, 'toJSON'>>
>

export class UserSetup {
  constructor(public pitch: number, public devices: UserDevices) {}

  // permissions?: UserPermissions = {
  //   camera: 'prompt',
  //   microphone: 'prompt',
  //   speaker: 'prompt',
  // }
  // devices: DevicePermissionDescriptor

  // setPermission(name?: PermissionName, state?: PermissionState) {
  //   this.permissions.camera
  // }
}
