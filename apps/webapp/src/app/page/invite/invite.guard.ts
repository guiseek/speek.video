import { UserSetupStorage } from '../../shared/data/user-setup.storage'
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
    return component.code.valid && component.form.valid
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> | boolean {
    const { pitch } = this.userSetup.getStoredValue()
    return !!pitch
  }
}
