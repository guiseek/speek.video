import { ConfirmDialog } from '@speek/ui/components'
import { MatDialog } from '@angular/material/dialog'
import { MeetComponent } from './meet.component'
import { Injectable } from '@angular/core'
import { UUID } from '@speek/util/format'
import { Observable, of } from 'rxjs'
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
} from '@angular/router'

@Injectable({ providedIn: 'root' })
export class MeetGuard implements CanActivate, CanDeactivate<MeetComponent> {
  constructor(private _dialog: MatDialog) {}

  canDeactivate(component: MeetComponent): Observable<boolean> {
    const data = {
      header: 'Finalizar chamada',
      body: `
        Você ainda está conectado.
        Cancele para continuar na
        chamada ou encerre confirmando
      `,
    }
    const state = component.state?.value
    return state === 'connected' || state === 'connecting'
      ? this._dialog.open(ConfirmDialog, { data }).afterClosed()
      : of(true)
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return UUID.isValid(route.paramMap.get('code'))
  }
}
