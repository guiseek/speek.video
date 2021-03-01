import { UserSetup } from '@speek/core/entity'
import { UserSetupStorage } from '@speek/data/storage'
import { ConfirmDialog } from '@speek/ui/components'
import { MatDialog } from '@angular/material/dialog'
import { MeetComponent } from './meet.component'
import { Injectable } from '@angular/core'
import { UUID } from '@speek/util/format'
import { Observable, of } from 'rxjs'
import {
  UrlTree,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'

@Injectable({ providedIn: 'root' })
export class MeetGuard implements CanActivate, CanDeactivate<MeetComponent> {
  constructor(
    private _dialog: MatDialog,
    readonly userSetup: UserSetupStorage
  ) {}

  canDeactivate(
    component: MeetComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const data = {
      header: 'Finalizar chamada',
      body: `
        Você ainda está conectado.
        Cancele para continuar na
        chamada ou encerre confirmando
      `,
    }
    const state = component.state?.value
    return state === 'connected' || state === 'connecting'
      ? this._dialog.open(ConfirmDialog, { data }).afterClosed()
      : of(true)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    const code = route.paramMap.get('code')

    if (UUID.isValid(code)) {
      const value: Partial<UserSetup> = this.userSetup.getStoredValue() ?? {}
      if (!value.pitch) {
        this.userSetup.update({ ...value, pitch: 0 })
      }
      return true
    }
  }
}
