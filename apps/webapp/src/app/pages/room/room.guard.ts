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

@Injectable({
  providedIn: 'root',
})
export class RoomGuard implements CanActivate {
  constructor(private _dialog: MatDialog, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> | boolean {
    const code = route.paramMap.get('code')
    // if (UUID.isValid(code)) {
    if (typeof code === 'string' && code !== 'newcode') {
      return true
    }
    return this._router.navigate(['/', UUID.short(), 'hall'], {
      queryParams: { pitch: 0 },
    })
  }
}
