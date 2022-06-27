import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SignalingAdapter } from '@speek/core/adapter'
import { ConfirmDialog } from '@speek/ui/components'
import { MatDialog } from '@angular/material/dialog'
import { MeetComponent } from './meet.component'
import { noop, Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { take, tap, map } from 'rxjs/operators'
import { UUID } from '@speek/util/format'
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
} from '@angular/router'

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
    const isFull$ = this._signaling.on(SpeekAction.Available).pipe(
      map((value: SpeekPayload & { full: boolean }) => {
        return value.code === params.code && value.full === true
      })
    )

    /* ask if there is anyone in the meeting room */
    const payload = new SpeekPayload('', params.code)
    this._signaling.send(SpeekAction.KnockKnock, payload)

    const ifFull = (full: boolean) => {
      return !full ? this._snackbar.open('Sala cheia') : noop
    }

    // return the answer to the question asked
    return isFull$.pipe(take(1), tap(ifFull))
  }
}
