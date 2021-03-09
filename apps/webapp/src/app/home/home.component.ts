import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { UserRoom, WithTarget } from '@speek/core/entity'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { debounceTime, takeUntil } from 'rxjs/operators'
import { UserRoomStorage } from '@speek/data/storage'
import { ShareService } from '@speek/ui/components'
import { BehaviorSubject, Subject } from 'rxjs'
import { UUID } from '@speek/util/format'
import {
  OnInit,
  OnDestroy,
  Component,
  HostBinding,
  HostListener,
} from '@angular/core'
import { Clipboard } from '@angular/cdk/clipboard'
import { AppSound } from '../app.sound'

const copyText = (code: string) => {
  const hello = 'Olá, conhece o Speek?'
  const howto = 'É só acessar speek.video e usar este código:'
  const link = 'Você pode acessar também clicando neste link:'
  const url = `https://speek.video/${code}/meet`
  return `${hello}\n\n${howto}\n${code}\n\n${link}\n${url}`
}

@Component({
  selector: 'speek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>()

  comeInOut = new BehaviorSubject<boolean>(false)

  @HostBinding('class.zoom')
  public get enter(): boolean {
    return this.comeInOut.value
  }

  form = this._builder.group({
    code: [Validators.required, Validators.pattern(UUID.regex)],
  })

  @HostListener('document:paste', ['$event'])
  onPaste(event: WithTarget<HTMLInputElement>) {
    event.stopPropagation()
    event.preventDefault()
    if ('clipboardData' in event || 'clipboardData' in window) {
      const clipboardData: DataTransfer =
        (event as any).clipboardData || (window as any).clipboardData

      // Take content from paste by user
      const content = clipboardData.getData('Text')
      // Check if UUID code exist from content
      const hasUUID = UUID.getFromText(content)

      let uuid: string
      // if it exists, take the first
      if ((uuid = hasUUID?.shift())) {
        this.code.patchValue(uuid)
      }
      event.target.blur()
    }
  }

  get code() {
    return this.form.get('code') as FormControl
  }

  constructor(
    private _router: Router,
    private _sound: AppSound,
    private _route: ActivatedRoute,
    private _share: ShareService,
    private _builder: FormBuilder,
    private _userRoom: UserRoomStorage,
    private _snackbar: MatSnackBar,
    readonly clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    const { code } = this._route.snapshot.params
    this.form.patchValue({ code: code ?? '' })
    this.form.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy))
      .subscribe(() => this.onCodeChange())
  }

  onCodeChange() {
    if (this.form.valid) {
      const code = this.code.value

      this._sound.play(this._sound.hero.decorative(3))

      this._userRoom.update(UserRoom.fromJson(this.form.value))

      setTimeout(() => this.comeInOut.next(true), 400)
      setTimeout(() => this._router.navigate(['/', code, 'meet']), 2400)
    }
  }

  create() {
    const uuid = UUID.long()
    const config = { duration: 2800 }
    this.clipboard.copy(copyText(uuid))

    this._sound.play(this._sound.hero.decorative(1))

    const message = this._snackbar.open(
      'Compartilhar chave agora?',
      'Sim',
      config
    )
    message.afterDismissed().subscribe(() => this.go(uuid))
    message.onAction().subscribe(() => {
      this._share.open(uuid).subscribe(() => this.go(uuid))
    })
  }

  go(code: string) {
    if (code) {
      this._router.navigate(['/', code, 'meet'])
    }
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
