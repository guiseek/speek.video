import { VideoDialog } from './video/video.dialog'
import { MatDialog } from '@angular/material/dialog'
import { stopStream } from '@speek/core/stream'
import { UserSetupStorage } from '@speek/data/storage'
import { UserSetupForm } from '@speek/ui/components'
import { BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import {
  OnInit,
  OnDestroy,
  ViewChild,
  Component,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { AudioDialog } from './audio/audio.dialog'

@Component({
  selector: 'speek-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()

  @ViewChild('video')
  private video: ElementRef<HTMLVideoElement>

  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>

  form = new UserSetupForm()

  stream: MediaStream
  // voice: Voice

  private _audioDevices = new BehaviorSubject<MediaDeviceInfo[]>([])
  audioDevices$ = this._audioDevices.asObservable()

  _videoDevices = new BehaviorSubject<MediaDeviceInfo[]>([])
  videoDevices$ = this._videoDevices.asObservable()

  constructor(
    private _dialog: MatDialog,
    readonly userSetup: UserSetupStorage
  ) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(value ? value : {})
  }

  ngAfterViewInit(): void {
    this.form.getDevices('videoinput').then((devices) => {
      // Criamos a lista de dispositivos de vídeo disponíveis
      this._videoDevices.next(devices.map((d) => d.toJSON()))
    })

    this.form.getDevices('audioinput').then((devices) => {
      // Criamos a lista de dispositivos de áudio disponíveis
      this._audioDevices.next(devices.map((d) => d.toJSON()))
    })

    /**
     * A cada alteração, verificamos se está válido
     * então executamos alteração na voz e salvamos
     */
    this.form.valueChanges.pipe(takeUntil(this._destroy)).subscribe((value) => {
      console.log(value)

      if (this.form.valid) {
        // this.voice.setPitchOffset(pitch)
        this.userSetup.update(this.form.value)
      }
    })
  }

  onAudioChange({ deviceId }: MediaDeviceInfo) {
    if (deviceId) {
      this._dialog.open(AudioDialog, {
        data: { deviceId },
        panelClass: 'audio-dialog',
      })
    }
  }

  onVideoChange({ deviceId }: MediaDeviceInfo) {
    if (deviceId) {
      this._dialog.open(VideoDialog, {
        data: { deviceId },
        panelClass: 'video-dialog',
      })
    }
  }

  compareFn(d1: MediaDeviceInfo, d2: MediaDeviceInfo): boolean {
    return d1 && d2 ? d1.deviceId === d2.deviceId : d1 === d2
  }

  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}
