import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { ShareComponent } from './share.component'
import { Injectable } from '@angular/core'
import { UUID } from '@speek/util/format'

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private _bottomSheet: MatBottomSheet) {}

  open<T>(data?: string) {
    return this._bottomSheet
      .open(ShareComponent, { data: data ?? UUID.long() })
      .afterDismissed()
  }
}
