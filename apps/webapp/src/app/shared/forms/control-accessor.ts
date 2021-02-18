import { ControlValueAccessor } from '@angular/forms'

export class ControlAccessor implements ControlValueAccessor {
  protected _value: any
  protected _disabled = false

  public get disabled(): boolean {
    return this._disabled
  }

  onChange: any = (val?: any) => {
    console.log(val)
  }
  onTouched: any = (val?: any) => {
    console.log(val)
  }

  writeValue(obj: any): void {
    if (this._value !== obj) {
      this._value = obj
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled
  }
}
