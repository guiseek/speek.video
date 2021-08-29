import { map, takeUntil } from 'rxjs/operators'
import { AlertDialog, AlertConfig, AlertService } from '@speek/ui/components'
import { isFirefox } from '@speek/util/device'
import { PermissionsAdapter } from '@speek/core/adapter'
import { MatDialogRef } from '@angular/material/dialog'
import { routerTransition } from './app.animation'
import { Component, OnDestroy } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { alert } from './config'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent implements OnDestroy {
  destroy = new Subject<void>()
  alert: MatDialogRef<AlertDialog, boolean>

  camera$: Observable<boolean>
  microphone$: Observable<boolean>

  constructor(
    private readonly permissions: PermissionsAdapter,
    private readonly alertService: AlertService
  ) {
    if (!isFirefox()) {
      const camera$ = this.permissions.state('camera')
      this.camera$ = camera$.pipe(map((state) => state === 'granted'))

      const microphone$ = this.permissions.state('microphone')
      this.microphone$ = microphone$.pipe(map((state) => state === 'granted'))

      camera$.pipe(takeUntil(this.destroy)).subscribe((permission) => {
        let config: AlertConfig
        if ((config = this.getConfig(permission))) {
          if (this.alert === undefined || this.alert?.getState() > 0) {
            this.alert = this.alertService.openAlert(config)
          }
        }
        if (this.alert && permission === 'granted') {
          this.alert.close()
        }
      })
    }
  }

  getConfig(permission: PermissionState): AlertConfig | null {
    switch (permission) {
      case 'denied':
      case 'prompt':
        return alert[permission]
      default:
        return null
    }
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
