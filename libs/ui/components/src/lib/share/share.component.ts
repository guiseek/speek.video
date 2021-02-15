import { Component, Inject } from '@angular/core'
import {
  ShareLanguage,
  shareLang,
  getLang,
  ValueOf,
  ShareTool,
  shareOption,
  share,
} from '@speek/util/share'
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet'

@Component({
  selector: 'speek-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  option = shareOption
  options: ValueOf<ShareLanguage> = shareLang[getLang()]
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: string,
    readonly sheetRef: MatBottomSheetRef<ShareComponent>,
    readonly sheet: MatBottomSheet
  ) {}

  shareLink(item: ShareTool) {
    const data = {
      title: 'Speek',
      url: `https://speek.video/#/${this.data}`,
      text: 'Pode falar? Clica aqui por favor',
    }
    share(data, item).then((value) => {
      this.sheetRef.dismiss(this.data)
    })
  }

  cancel() {
    this.sheetRef.dismiss()
  }
}
