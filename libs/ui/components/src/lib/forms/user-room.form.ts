import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserRoom } from '@speek/core/entity'
import { UUID } from '@speek/util/format'

export class UserRoomForm extends FormGroup {
  constructor(value?: Partial<UserRoom>) {
    const { code } = value ?? {}
    super({
      code: new FormControl(code, [
        Validators.required,
        Validators.pattern(UUID.regex),
      ]),
    })
  }

  getUserRoom() {
    return UserRoom.fromJson(this.value)
  }

  get code() {
    return this.get('code') as FormControl
  }
}
