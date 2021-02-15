import { UserSetupStorage } from '@speek/data/storage'
import { getMediaDevices, configVideoSource } from '@speek/util/device'
import { FormBuilder, Validators } from '@angular/forms'
import { stopStream } from '@speek/core/stream'
import { BehaviorSubject } from 'rxjs'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video')
  private video: ElementRef<HTMLVideoElement>

  stream: MediaStream

  private _devices = new BehaviorSubject<MediaDeviceInfo[]>([])
  devices$ = this._devices.asObservable()

  form = this._fb.group({
    pitch: [0, [Validators.min(-2), Validators.max(2)]],
    devices: this._fb.group({
      video: ['', Validators.required],
    }),
  })

  constructor(private _fb: FormBuilder, readonly userSetup: UserSetupStorage) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(!!value ? value : {})
    if (this.form.get('devices.video').value) {
      this.getStream(this.form.get('devices.video').value)
    }
  }

  ngAfterViewInit(): void {
    getMediaDevices('videoinput').then((devices) => this._devices.next(devices))
  }

  onDeviceChange(device: MediaDeviceInfo) {
    stopStream(this.stream)
    if (device) {
      this.getStream(device)
    }
  }

  async getStream(device: MediaDeviceInfo) {
    return navigator.mediaDevices
      .getUserMedia(configVideoSource(device))
      .then((stream) => this.gotStream(this.video, stream))
  }

  gotStream({ nativeElement }, stream: MediaStream) {
    nativeElement.srcObject = stream
    this.stream = stream
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
  }
}
