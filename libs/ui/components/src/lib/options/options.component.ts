import { Component, Inject, OnInit } from '@angular/core'
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet'

export interface OptionClicked<T> {
  icon: string
  label: string
  data: T
}

@Component({
  selector: 'speek-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent<T> implements OnInit {
  constructor(
    private _ref: MatBottomSheetRef<OptionsComponent<T>>,
    @Inject(MAT_BOTTOM_SHEET_DATA) readonly data: OptionClicked<T>[]
  ) {}

  openLink(event: MouseEvent): void {
    this._ref.dismiss()
    event.preventDefault()
  }

  ngOnInit(): void {}

  onClick(val?: any) {
    this._ref.dismiss()
  }
}
