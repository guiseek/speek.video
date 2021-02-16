import { UserSetupForm, drawOscilloscope } from '@speek/ui/components'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { stopStream, Voice } from '@speek/core/stream'
import { UserSetupStorage } from '@speek/data/storage'
import { takeUntil } from 'rxjs/operators'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
})
export class VoiceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>

  stream: MediaStream
  stream$: Observable<MediaStream>

  private _devices = new BehaviorSubject<MediaDeviceInfo[]>([])
  devices$ = this._devices.asObservable()

  form = new UserSetupForm()

  private _destroy = new Subject<void>()
  constructor(readonly userSetup: UserSetupStorage) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(!!value ? value : {})
    if (this.form.audio.value) {
      this.getStream(this.form.audio.value)
    }
  }

  ngAfterViewInit(): void {
    this.form.getDevices('audioinput').then((devices) => {
      this._devices.next(devices.map((d) => d.toJSON()))
    })
  }

  onDeviceChange(device: MediaDeviceInfo) {
    stopStream(this.stream)
    if (device) {
      this.getStream(device)
    }
  }

  async getStream({ deviceId }: MediaDeviceInfo) {
    stopStream(this.stream)
    return navigator.mediaDevices
      .getUserMedia({
        audio: { deviceId, echoCancellation: true, noiseSuppression: true },
      })
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

  compareFn(d1: MediaDeviceInfo, d2: MediaDeviceInfo): boolean {
    return d1 && d2 ? d1.deviceId === d2.deviceId : d1 === d2
  }

  onSave() {
    if (this.form.valid) {
      this.userSetup.update(this.form.getUserSetup())
      this.form.markAsPristine()
    }
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
    this._destroy.next()
    this._destroy.complete()
  }
}
