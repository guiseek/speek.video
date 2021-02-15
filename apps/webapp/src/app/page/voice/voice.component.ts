import { takeUntil } from 'rxjs/operators'
import { stopStream, Voice } from '@speek/core/stream'
import { UserSetupStorage } from './../../shared/data/user-setup.storage'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, Subject } from 'rxjs'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { drawOscilloscope } from '@speek/ui/components'

@Component({
  selector: 'speek-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
})
export class VoiceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>

  stream: MediaStream

  private _destroy = new Subject<void>()
  form = this._fb.group({
    pitch: [0, [Validators.min(-2), Validators.max(2)]],
  })

  stream$: Observable<MediaStream>
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    readonly userSetup: UserSetupStorage
  ) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(!!value ? value : {})
  }

  ngAfterViewInit(): void {
    navigator.mediaDevices
      .getUserMedia({ audio: { echoCancellation: true } })
      .then((stream) => this.gotStream(stream))
  }

  gotStream(stream: MediaStream) {
    this.stream = stream
    const audioContext = new AudioContext()
    const microphone = audioContext.createMediaStreamSource(stream)

    const analyser = audioContext.createAnalyser()

    const delay = audioContext.createDelay()
    delay.delayTime.value = 0

    microphone.connect(delay)

    const voice = new Voice(audioContext)
    const { value } = this.form.get('pitch')
    voice.setPitchOffset(value)

    delay.connect(voice.input)
    voice.output.connect(audioContext.destination)
    voice.output.connect(analyser)

    drawOscilloscope(this.canvas.nativeElement, analyser)

    this.form.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe(({ pitch }) => {
        voice.setPitchOffset(pitch)
      })
  }

  onSave() {
    if (this.form.valid) {
      this.userSetup.store(this.form.value)
      this.form.markAsPristine()
      // this._router.navigate(['/', 'newcode'])
    }
  }

  ngOnDestroy(): void {
    stopStream(this.stream)
    this._destroy.next()
    this._destroy.complete()
  }
}
