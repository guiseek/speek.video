import { OptionsComponent } from './options.component'
import { Injectable } from '@angular/core'
import { MatBottomSheet } from '@angular/material/bottom-sheet'

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private _bottomSheet: MatBottomSheet) {}

  open<T>(options: T[]) {
    return this._bottomSheet
      .open(OptionsComponent, {
        data: options,
      })
      .afterDismissed()
  }
}
