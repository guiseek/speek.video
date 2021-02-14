import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { Injectable } from '@angular/core'
import { ShareComponent } from './share.component'

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private _bottomSheet: MatBottomSheet) {}

  open<T>(options: T[]) {
    return this._bottomSheet
      .open(ShareComponent, {
        data: options,
      })
      .afterDismissed()
  }
}
