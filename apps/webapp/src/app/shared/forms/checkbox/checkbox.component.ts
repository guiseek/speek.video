import {
  AbstractControl,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ControlAccessor } from '../control-accessor';
import { EventInputTarget } from '../event-input';
import { Subject } from 'rxjs';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injectable,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';

@Injectable()
export class CheckboxAccessor extends ControlAccessor {}

const CheckboxProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxAccessor),
  multi: true,
};

let nextId = 0;

@Component({
  selector: 'speek-checkbox',
  template: `
    <div class="speek-checkbox-container">
      <input
        [id]="id"
        type="checkbox"
        name="checkbox"
        role="checkbox"
        tabindex="0"
        [value]="value"
        [checked]="el?.checked"
        [attr.aria-checked]="el?.checked"
        [attr.disabled]="disabled"
        [formControl]="control"
        (change)="onChangeEvent($event)"
        #input
      />
      <label [for]="id">
        <ng-content></ng-content>

        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.3,61.3c5.7,4.1,13.2,11.8,16.7,18C53,60.5,66,41,77.7,20.8"
          />
        </svg>
      </label>
    </div>
  `,
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CheckboxAccessor, CheckboxProvider],
})
export class CheckboxComponent extends CheckboxAccessor
  implements AfterContentInit, OnDestroy {
  destroy$ = new Subject<void>();

  @ViewChild('input', { static: true }) _el!: ElementRef<HTMLInputElement>;
  get el() {
    return this._el.nativeElement;
  }

  private _id = `form-checkbox-${nextId++}`;

  @Input()
  public set value(value: any) {
    this._value = value;
  }
  public get value(): any {
    return this._value;
  }

  @Input()
  public set id(value: string) {
    this._id = value;
  }
  public get id(): string {
    return this._id;
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  @Output()
  valueChange = new EventEmitter<any>();

  @Output()
  checkedChange = new EventEmitter<CheckboxComponent>();

  control!: AbstractControl;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control
      ? this.ngControl?.control
      : new FormControl();
  }

  onChangeEvent({ target }: EventInputTarget) {
    if (target.value) {
      this.onChange(target.value);
    }
    this.checkedChange.emit(this);
    this.valueChange.emit(target.value);
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
