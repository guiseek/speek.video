import { FormBuilder, FormControl } from '@angular/forms'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { DialPadComponent } from '../../shared/dial/dial-pad/dial-pad.component'

@Component({
  selector: 'speek-dial-up',
  templateUrl: './dial-up.component.html',
  styleUrls: ['./dial-up.component.scss'],
})
export class DialUpComponent implements OnInit {
  @ViewChild('localAudio')
  audioRef: ElementRef<HTMLAudioElement>
  audio: HTMLAudioElement

  @ViewChild(DialPadComponent) dialPad: DialPadComponent
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

  ngOnInit(): void {}

  onClicked($event: string | number) {
    console.log($event)
  }
  call() {
    console.log(this.audio)
    // this.dtmf.call(this.audio)
  }
  sendTones() {
    // this.dtmf.sendTones(this.form.value)
  }
}
