import { drawOscilloscope, UserSetupForm } from '@speek/ui/components'
import { stopStream, Voice } from '@speek/core/stream'
import { UserSetupStorage } from '@speek/data/storage'
import { BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core'

@Component({
  selector: 'speek-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()

  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>

  form = new UserSetupForm()
  stream: MediaStream
  voice: Voice

  private _devices = new BehaviorSubject<MediaDeviceInfo[]>([])
  devices$ = this._devices.asObservable()

  constructor(readonly userSetup: UserSetupStorage) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(value ? value : {})
  }

  ngAfterViewInit(): void {
    this.form.getDevices('audioinput').then((devices) => {
      // Criamos a lista de dispositivos disponíveis
      this._devices.next(devices.map((d) => d.toJSON()))

      if (!this.form.audio.value && this.form.pitch.enabled) {
        this.form.pitch.disable()
      }

      if (this.form.audio.value) {
        this.getStream(this.form.audio.value)
      }
    })

    /**
     * A cada alteração, verificamos se está válido
     * então executamos alteração na voz e salvamos
     */
    this.form.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe(({ pitch }) => {
        if (this.form.valid) {
          this.voice.setPitchOffset(pitch)
          this.userSetup.update(this.form.value)
        }
      })
  }

  onDeviceChange(device: MediaDeviceInfo) {
    if (device) {
      this.getStream(device)

      if (this.form.pitch.disabled) {
        this.form.pitch.enable()
      }
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

    this.voice = new Voice(audioContext)
    const { value } = this.form.pitch
    this.voice.setPitchOffset(value)

    delay.connect(this.voice.input)
    this.voice.output.connect(audioContext.destination)
    this.voice.output.connect(analyser)

    drawOscilloscope(this.canvas.nativeElement, analyser)

    this.voice.setPitchOffset(this.form.pitch.value)
  }

  compareFn(d1: MediaDeviceInfo, d2: MediaDeviceInfo): boolean {
    return d1 && d2 ? d1.deviceId === d2.deviceId : d1 === d2
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
    this._destroy.next()
    this._destroy.complete()
  }
}
