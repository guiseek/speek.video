import { UserSetupStorage } from '../../shared/data/user-setup.storage'
import { MatDialog } from '@angular/material/dialog'
import { Injectable } from '@angular/core'
import { UUID } from '@speek/util/format'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'
import { CodeDialog } from '@speek/ui/components'
import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RoomGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    readonly userSetup: UserSetupStorage
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const code = route.paramMap.get('code')
    if (UUID.isValid(code)) {
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
