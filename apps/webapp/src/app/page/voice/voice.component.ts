import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { FormBuilder, Validators } from '@angular/forms'
import { drawOscilloscope } from '@speek/ui/components'
import { stopStream, Voice } from '@speek/core/stream'
import { UserSetupStorage } from '@speek/data/storage'
import { configAudioSource, getMediaDevices } from '@speek/util/device'
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

  form = this._fb.group({
    pitch: [0, [Validators.min(-2), Validators.max(2)]],
    devices: this._fb.group({
      audio: ['', Validators.required],
    }),
  })

  private _destroy = new Subject<void>()
  constructor(private _fb: FormBuilder, readonly userSetup: UserSetupStorage) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(!!value ? value : {})
    if (this.form.get('devices.audio').value) {
      this.getStream(this.form.get('devices.audio').value)
    }
  }

  ngAfterViewInit(): void {
    getMediaDevices('audioinput').then((devices) => {
      this._devices.next(devices.map((d) => d.toJSON()))
    })
    navigator.mediaDevices
      .getUserMedia({ audio: { echoCancellation: true } })
      .then((stream) => this.gotStream(stream))
  }

  onDeviceChange(device: MediaDeviceInfo) {
    stopStream(this.stream)
    if (device) {
      this.getStream(device)
    }
  }

  async getStream(device: MediaDeviceInfo) {
    return navigator.mediaDevices
      .getUserMedia(configAudioSource(device))
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
      this.userSetup.update(this.form.value)
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
