import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Share } from '@speek/util/share'

export class ShareMessageForm extends FormGroup {
  constructor(value?: Share) {
    const { url, text, hashtags, title = 'Speek' } = value ?? {}
    super({
      url: new FormControl(url, [Validators.required]),
      hashtags: new FormControl(hashtags),
      title: new FormControl(title),
      text: new FormControl(text),
    })
  }

  get url() {
    return this.get('url') as FormControl
  }

  get hashtags() {
    return this.get('hashtags') as FormControl
  }

  get title() {
    return this.get('title') as FormControl
  }

  get text() {
    return this.get('text') as FormControl
  }
}
