import { UserSetupStorage } from '../../shared/data/user-setup.storage'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { FormBuilder, Validators } from '@angular/forms'
import { stopStream } from '@speek/core/stream'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

const getDevices = async (params: MediaDeviceKind) => {
  const filter = ({ kind }: MediaDeviceInfo) => kind === params
  const devices = await navigator.mediaDevices.enumerateDevices()
  return params ? devices.filter(filter) : devices
}

const getVideoDeviceConfig = (device: MediaDeviceInfo) =>
  ({
    video: {
      optional: [{ sourceId: device }],
    },
  } as MediaStreamConstraints)

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
      videoinput: ['', Validators.required],
    }),
  })

  constructor(
    private _fb: FormBuilder,
    readonly userSetup: UserSetupStorage
  ) {}

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(!!value ? value : {})
  }

  ngAfterViewInit(): void {
    getDevices('videoinput').then((devices) => this._devices.next(devices))
  }

  onDeviceChange(device: MediaDeviceInfo) {
    navigator.mediaDevices
      .getUserMedia(getVideoDeviceConfig(device))
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
      this.userSetup.store(this.form.value)
      this.form.markAsPristine()
    }
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
  }
}
