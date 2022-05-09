import { Observable } from 'rxjs'

export class UserSetupAdapter {
  permissions: Permissions
  camera: Observable<PermissionState>
  constructor() {
    this.permissions = navigator.permissions

    this.camera = new Observable<PermissionState>((subscriber) => {
      // const camera = this.permissions.query({ name: 'screen-wake-lock' })
      // camera.then((permission) => {
      //   console.log('permission: ', permission)
      //   subscriber.next(permission.state)
      //   permission.addEventListener('change', function (ev) {
      //     console.log('permission: ', permission)
      //     console.log('state: ', this.state)
      //     subscriber.next(this.state)
      //   })
      // })
    })
  }
}
