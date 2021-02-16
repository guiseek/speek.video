import { UserSetup } from '@speek/core/entity'
import { UserSetupStorage } from '@speek/data/storage'
import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanDeactivate,
} from '@angular/router'
import { InviteComponent } from './invite.component'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class InviteGuard
  implements CanActivate, CanDeactivate<InviteComponent> {
  constructor(readonly userSetup: UserSetupStorage, private _router: Router) {}
  canDeactivate(
    component: InviteComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return component.form.valid
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> | boolean {
    const value: Partial<UserSetup> = this.userSetup.getStoredValue() ?? {}
    if (!value.pitch) {
      this.userSetup.store(Object.assign(value, { pitch: 0 }) as UserSetup)
    }
    return true
  }
}
