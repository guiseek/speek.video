import { UserSetupStorage } from '@speek/data/storage'
import { UserSetupForm } from '@speek/ui/components'
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

  form = new UserSetupForm()

  constructor(readonly userSetup: UserSetupStorage) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(!!value ? value : {})
  }

  ngAfterViewInit(): void {
    this.form.getDevices('videoinput').then((devices) => {
      this._devices.next(devices.map((d) => d.toJSON()))
    })
  }

  onDeviceChange(device: MediaDeviceInfo) {
    stopStream(this.stream)
    if (device) {
      this.getStream(device)
    }
  }

  toggleVideo() {
    if (this.stream?.active) {
      stopStream(this.stream)
    } else {
      this.getStream(this.form.video.value)
    }
  }

  async getStream({ deviceId }: MediaDeviceInfo) {
    return navigator.mediaDevices
      .getUserMedia({ video: { deviceId } })
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
      this.userSetup.update(this.form.getUserSetup())
      this.form.markAsPristine()
    }
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
  }
}
