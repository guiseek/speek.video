import { ConfirmDialog, DialogConfirmData } from '@speek/ui/components'
import { UserSetupStorage } from '@speek/data/storage'
import { MatDialog } from '@angular/material/dialog'
import { RoomComponent } from './room.component'
import { isDefined } from '@speek/util/format'
import { UserSetup } from '@speek/core/entity'
import { Injectable } from '@angular/core'
import { UUID } from '@speek/util/format'
import { EMPTY, Observable } from 'rxjs'
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class RoomGuard implements CanActivate, CanDeactivate<RoomComponent> {
  constructor(
    private _dialog: MatDialog,
    readonly userSetup: UserSetupStorage
  ) {}

  canDeactivate(
    component: RoomComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const data: DialogConfirmData = {
      header: 'Finalizar chamada',
      body: 'Cancele para continuar na chamada ou encerre confirmando',
    }

    const OK = this._dialog.open(ConfirmDialog, { data })
    return component.localStream?.active ? OK.afterClosed() : EMPTY
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    const code = route.paramMap.get('code')

    if (UUID.isValid(code)) {
      const value: Partial<UserSetup> = this.userSetup.getStoredValue() ?? {}
      if (!value.pitch) {
        this.userSetup.store(Object.assign(value, { pitch: 0 }) as UserSetup)
      }
      return true
    }
  }
}
