import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'
import { peekCode, validatePeekCode } from '@peek/core/model'
import { PeekCodeDialog } from '@peek/shared/elements'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class MeetGuard implements CanActivate {
  constructor(private _dialog: MatDialog, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const code = route.paramMap.get('code')
    if (validatePeekCode(code)) {
      return true
    }
    return this._dialog
      .open(PeekCodeDialog, { data: peekCode() })
      .afterClosed()
      .pipe(
        switchMap((response) => this._router.navigate(['/', response ?? '']))
      )
  }
}
