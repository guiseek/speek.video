import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { SnackComponent } from './snack.component'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(readonly snack: MatSnackBar) {}

  open(config: Pick<MatSnackBarConfig, 'data' | 'announcementMessage'>) {
    const { data, announcementMessage } = config
    return this.snack.openFromComponent(SnackComponent, {
      panelClass: 'speek-snack',
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      announcementMessage,
      data,
    })
  }
}
