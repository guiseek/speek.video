export type UserPermissions = Pick<
  Record<PermissionName, PermissionState>,
  'camera' | 'speaker' | 'microphone'
>

export class UserSetup {
  permissions: UserPermissions = {
    camera: 'prompt',
    microphone: 'prompt',
    speaker: 'prompt',
  }
  devices: DevicePermissionDescriptor
  constructor() {}

  setPermission(name?: PermissionName, state?: PermissionState) {
    this.permissions.camera
  }
}
