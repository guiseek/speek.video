import { ConfirmDialog, DialogConfirmData } from '@speek/ui/components'
import { UserSetupStorage } from '../../shared/data/user-setup.storage'
import { MatDialog } from '@angular/material/dialog'
import { Injectable } from '@angular/core'
import { UUID } from '@speek/util/format'
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'
import { CodeDialog } from '@speek/ui/components'
import { switchMap } from 'rxjs/operators'
import { EMPTY, Observable } from 'rxjs'
import { RoomComponent } from './room.component'

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
      body:
        'Cancele para continuar na chamada ou encerre confirmando',
    }
    return component.localStream.active
      ? this._dialog.open(ConfirmDialog, { data }).afterClosed()
      : EMPTY
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const code = route.paramMap.get('code')
    if (UUID.isValid(code) || /^[a-z\d\-_\s]+$/i.test(code)) {
      return true
    }
    return this._dialog
      .open(CodeDialog, { data: UUID.long() })
      .afterClosed()
      .pipe(
        switchMap((response) => this._router.navigate(['/', response ?? '']))
      )

    // const code = route.paramMap.get('code')
    // const setup = this.userSetup.getStoredValue()
    // if (UUID.isValid(code) && setup?.pitch) {
    //   return this._router.navigate(['/', code])
    // }
    // return this._router.navigate(['/', setup.pitch ? 'invite' : 'voice'])
  }
}
