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
  selector: 'speek-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video')
  private video: ElementRef<HTMLVideoElement>

  form = new UserSetupForm()
  stream: MediaStream

  private _devices = new BehaviorSubject<MediaDeviceInfo[]>([])
  devices$ = this._devices.asObservable()

  constructor(readonly userSetup: UserSetupStorage) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(value ? value : {})
  }

  ngAfterViewInit(): void {
    this.form.getDevices('videoinput').then((devices) => {
      // Criamos a lista de dispositivos disponíveis
      this._devices.next(devices.map((d) => d.toJSON()))
    })
  }

  onDeviceChange(device: MediaDeviceInfo) {
    if (device) {
      this.getStream(device)
    }
    if (this.form.valid) {
      this.userSetup.update(this.form.value)
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

  toggleVideo() {
    if (this.stream?.active) {
      stopStream(this.stream)
      this.stopVideo(this.video)
    } else {
      this.getStream(this.form.video.value)
    }
  }

  stopVideo({ nativeElement }) {
    nativeElement.srcObject = null
  }

  compareFn(d1: MediaDeviceInfo, d2: MediaDeviceInfo): boolean {
    return d1 && d2 ? d1.deviceId === d2.deviceId : d1 === d2
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
  }
}
