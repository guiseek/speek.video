import { UserSetupStorage } from '../../shared/data/user-setup.storage'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { drawOscilloscope } from '@speek/ui/components'
import { stopStream, Voice } from '@speek/core/stream'
import { takeUntil } from 'rxjs/operators'
import { UUID } from '@speek/util/format'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()

  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>

  stream: MediaStream

  code = new FormControl('', [
    Validators.required,
    Validators.pattern(UUID.regex),
  ])

  form = this._fb.group({
    pitch: [0, [Validators.min(-2), Validators.max(2)]],
  })

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
      this._router.navigate(['/', 'newcode'])
      console.log(this.form.value)
    }
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
    this._destroy.next()
    this._destroy.complete()
  }

  onSubmit() {
    if (this.form.valid) {
      this.userSetup.store(this.form.value)
      this._router.navigate(['/', UUID.long()])
    }
  }
}