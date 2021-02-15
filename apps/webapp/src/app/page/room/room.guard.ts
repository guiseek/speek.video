import { ConfirmDialog, DialogConfirmData } from '@speek/ui/components'
import { UserSetupStorage } from '@speek/data/storage'
import { MatDialog } from '@angular/material/dialog'
import { RoomComponent } from './room.component'
import { isDefined } from '@speek/util/format'
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
    private _router: Router,
    private _dialog: MatDialog,
    readonly userSetup: UserSetupStorage
  ) {}

  canDeactivate(
    component: RoomComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const data: DialogConfirmData = {
      header: 'Finalizar chamada',
      body: 'Cancele para continuar na chamada ou encerre confirmando',
    }
    return component.localStream.active
      ? this._dialog.open(ConfirmDialog, { data }).afterClosed()
      : EMPTY
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    const code = route.paramMap.get('code')

    if (UUID.isValid(code)) {
      const { pitch } = this.userSetup.getStoredValue()
      if (!isDefined(pitch)) {
        return this._router.navigate(['/', 'invite', code])
      } else {
        return true
      }
    }
  }
}
