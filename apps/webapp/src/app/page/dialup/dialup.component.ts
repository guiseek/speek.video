import { FormBuilder, FormControl } from '@angular/forms'
import { Component, ElementRef, ViewChild } from '@angular/core'
import { DialpadComponent } from '@speek/ui/components'

@Component({
  selector: 'speek-dialup',
  templateUrl: './dialup.component.html',
  styleUrls: ['./dialup.component.scss'],
})
export class DialupComponent {
  @ViewChild('localAudio')
  audioRef: ElementRef<HTMLAudioElement>
  audio: HTMLAudioElement

  @ViewChild(DialpadComponent) dialPad: DialpadComponent
  // dtmf: DtmfCall
  form = this._fb.group({
    sendTones: [{ value: '', disabled: true }],
    duration: [500],
    gap: [50],
    tones: ['1199##9,6633221,9966332,9966332,1199##9,6633221'],
  })
  gap = new FormControl(50)
  duration = new FormControl(500)
  constructor(private _fb: FormBuilder) {}

  onClicked($event: string | number) {
    console.log($event)
  }
  call() {
    console.log(this.audio)
  }
  sendTones() {
    // this.dtmf.sendTones(this.form.value)
  }
}
