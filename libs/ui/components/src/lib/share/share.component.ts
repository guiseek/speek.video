import { Component, OnInit, Inject } from '@angular/core'
import {
  ShareLanguage,
  shareLang,
  getLang,
  ValueOf,
  shareOption,
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
export class ShareComponent implements OnInit {
  option = shareOption

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: string,
    readonly sheetRef: MatBottomSheetRef<ShareComponent>,
    readonly sheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    console.log(this.option);

  }
}
