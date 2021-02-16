import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { Share, share, ShareTool } from '@speek/util/share'
import { ShareMessageDialog } from './message.dialog'
import { MatDialog } from '@angular/material/dialog'
import { ShareComponent } from './share.component'
import { map, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { UUID } from '@speek/util/format'

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) {}

  open<T>(uuid?: string) {
    return this._bottomSheet
      .open(ShareComponent, { data: uuid ?? UUID.long() })
      .afterDismissed()
      .pipe(
        switchMap((data) =>
          this._dialog.open(ShareMessageDialog, { data }).afterClosed()
        ),
        map((result: Share) => share(result, result.hashtags as ShareTool))
      )
  }
}
