import { ShareMessageForm } from '../forms/share-message.form'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject } from '@angular/core'
import { Share } from '@speek/util/share'

@Component({
  templateUrl: './message.dialog.html',
  styleUrls: ['./message.dialog.scss'],
})
export class ShareMessageDialog {
  form = new ShareMessageForm()

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: Share
  ) {
    this.form.patchValue(data)
  }
}
