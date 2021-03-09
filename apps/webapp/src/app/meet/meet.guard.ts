import { MatSnackBar } from '@angular/material/snack-bar'
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
import { SignalingAdapter } from '@speek/core/adapter'
import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { map, take, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class MeetGuard implements CanActivate, CanDeactivate<MeetComponent> {
  constructor(
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private _signaling: SignalingAdapter
  ) {}

  canDeactivate(component: MeetComponent): Observable<boolean> {
    const data = {
      header: 'Finalizar chamada',
      body: `
        Você ainda está conectado.
        Cancele para continuar na
        chamada ou encerre confirmando
      `,
    }
    const panelClass = 'confirm-dialog'
    const config = { data, panelClass }
    const state = component.state?.value
    return state === 'connected' || state === 'connecting'
      ? this._dialog.open(ConfirmDialog, config).afterClosed()
      : of(true)
  }

  canActivate({
    params,
  }: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    /* if the code is wrong, return */
    if (UUID.isValid(params.code) === false) {
      return false
    }
    /* listening to availability response */
    const isFull$ = this._signaling.on(SpeekAction.Available)

    /* ask if there is anyone in the meeting room */
    const payload = new SpeekPayload('', params.code)
    this._signaling.send(SpeekAction.KnockKnock, payload)

    // return the answer to the question asked
    return (isFull$ as Observable<any>).pipe(
      take(1),
      tap((result) => {
        if (result === false) {
          this.showSnack('Já tem 2 pessoas na sala')
        }
      })
    )
  }

  private showSnack(message: string) {
    return this._snackbar.open(message, 'Fechar', {
      panelClass: 'available-snackbar',
      duration: 4000,
    })
  }
}
