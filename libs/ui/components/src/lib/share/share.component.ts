import { Component, Inject } from '@angular/core'
import {
  ShareLanguage,
  shareLang,
  getLang,
  ValueOf,
  ShareTool,
  shareOption,
  Share,
} from '@speek/util/share'
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet'
import { KindRoom } from '@speek/core/entity'

export interface ShareDataMessage {
  uuid?: string
  kindRoom?: KindRoom
}

@Component({
  selector: 'speek-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  option = shareOption
  options: ValueOf<ShareLanguage> = shareLang[getLang()]
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ShareDataMessage,
    readonly sheetRef: MatBottomSheetRef<ShareComponent, Share>,
    readonly sheet: MatBottomSheet
  ) {}

  shareLink(item: ShareTool) {
    const text = `Olá 👋
Vamos conversar pelo Speek! Clique no link abaixo.`
    this.sheetRef.dismiss({
      hashtags: item,
      title: 'Speek',
      text: text,
      url: `https://speek.video/#/${this.data.uuid}/${this.data.kindRoom}`,
    })
  }

  cancel() {
    this.sheetRef.dismiss()
  }
}
