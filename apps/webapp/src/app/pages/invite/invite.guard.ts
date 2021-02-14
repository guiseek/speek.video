import { UserSetupStorage } from '../../shared/data/user-setup.storage'
import { Injectable } from '@angular/core'
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
export class InviteGuard implements CanActivate {
  constructor(readonly userSetup: UserSetupStorage, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> | boolean {
    const setup = this.userSetup.getStoredValue()
    if (setup?.pitch) {
      return true
    }
    return this._router.navigate(['/', 'voice'])
  }
}
