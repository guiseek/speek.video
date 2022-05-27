import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject } from '@angular/core'

@Component({
  template: `
    <h1 matDialogTitle>Sua voz</h1>

    <mat-dialog-content>
      <speek-wave (valueChange)="onChange($event)"></speek-wave>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button matDialogClose>Pular</button>
      <button
        type="button"
        color="accent"
        mat-stroked-button
        (click)="onConfirm()"
      >
        Continuar
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: column;

        min-width: 400px;
      }
      .mat-dialog-actions {
        flex: 1;
        justify-content: space-between;
      }
    `,
  ],
})
export class WaveDialog {
  value = 1

  constructor(
    private _ref: MatDialogRef<WaveDialog>,
    @Inject(MAT_DIALOG_DATA) readonly code: string
  ) {}

  onChange(value: number) {
    this.value = value
  }

  onConfirm() {
    this._ref.close({ response: this.code, pitch: this.value })
  }
}
