import { UUID } from '@speek/util/format'
import { CreateComponent } from './create.component'
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate,
  Router,
} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class CreateGuard implements CanDeactivate<CreateComponent> {
  constructor(private _router: Router) {}
  canDeactivate(
    component: CreateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    console.log(component.code)

    if (component.code) {
      return this.go(component.code.value)
    }
    return this.go(UUID.short())
  }

  go(code: string) {
    return this._router.navigate(['/', code])
  }
}
