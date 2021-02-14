export type UserPermissions = Pick<
  Record<PermissionName, PermissionState>,
  'camera' | 'speaker' | 'microphone'
>

export class UserSetup {
  constructor(public pitch: number) {}
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
