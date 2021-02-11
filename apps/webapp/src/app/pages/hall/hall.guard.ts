import { MatDialog } from '@angular/material/dialog'
import { CodeDialog, WaveDialog } from '@speek/ui/components'
import { Injectable } from '@angular/core'
import { map, switchMap } from 'rxjs/operators'
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
export class HallGuard implements CanActivate {
  constructor(private _dialog: MatDialog, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const code = route.paramMap.get('code')
    if (UUID.isValid(code)) {
      return true
    }
    return this._dialog
      .open(WaveDialog, { data: UUID.long() })
      .afterClosed()
      .pipe(
        switchMap(({ response, pitch }) => {
          console.log('response: ', response);
          console.log('pitch: ', pitch);

          return this._router.navigate(['/', response ?? ''], {
            queryParams: { pitch },
          })
        })
      )
  }
}
