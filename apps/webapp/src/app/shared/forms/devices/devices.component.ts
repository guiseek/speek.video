import {
  AbstractControl,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { ControlAccessor } from '../control-accessor'
import { BehaviorSubject } from 'rxjs'
import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core'

export const getDevices = async (params: MediaDeviceKind) => {
  const filter = ({ kind }: MediaDeviceInfo) => kind === params
  const devices = await navigator.mediaDevices.enumerateDevices()
  return params ? devices.filter(filter) : devices
}

const DevicesProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ControlAccessor),
  multi: true,
}

@Component({
  selector: 'speek-devices',
  templateUrl: './devices.component.html',
  providers: [ControlAccessor, DevicesProvider],
})
export class DevicesComponent extends ControlAccessor implements OnInit {
  private _kind: MediaDeviceKind
  public get kind(): MediaDeviceKind {
    return this._kind
  }

  @Input()
  public set kind(value: MediaDeviceKind) {
    this._kind = value
  }

  private _required: boolean
  public get required(): boolean {
    return this._required
  }
  @Input()
  // @HostBinding('attr.required')
  public set required(value: boolean) {
    this._required = value
    if (value !== false) {
      this._required = true
    }
  }

  @Input() label: string
  @Input() placeholder = ''

  protected _value: any = ''
  public get value(): any {
    return this._value
  }
  public set value(value: any) {
    this._value = value
  }

  @Output() valueChange = new EventEmitter<MediaDeviceInfo>()

  private _choices = new BehaviorSubject<MediaDeviceInfo[]>([])
  public choices$ = this._choices.asObservable()

  // getDevices = new GetDevices()

  control: AbstractControl = new FormControl()

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super()
    if (this.ngControl) {
      this.ngControl.valueAccessor = this
      // this.control = this.ngControl.control
    }
  }

  ngOnInit(): void {
    const inputs = ['', 'audioinput', 'audiooutput', 'videoinput']
    if (!!this.kind && !inputs.includes(this.kind)) {
      throw Error('Invalid kind, example of valid kinds' + inputs.join(', '))
    }
    this.setUpChoices(this.kind)
  }

  deviceChange(device: MediaDeviceInfo) {
    this.valueChange.emit(device)
  }

  setUpChoices(deviceKind?: MediaDeviceKind) {
    console.log(deviceKind)

    getDevices(deviceKind).then((devices) => this._choices.next(devices))
  }
}
