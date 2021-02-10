import { MatDialog } from '@angular/material/dialog'
import { CodeDialog } from '@speek/ui/components'
import { Injectable } from '@angular/core'
import { switchMap } from 'rxjs/operators'
import { UUID } from '@speek/util/format'
import { Observable } from 'rxjs'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class RoomGuard implements CanActivate {
  constructor(private _dialog: MatDialog, private _router: Router) {}
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
  }
}
