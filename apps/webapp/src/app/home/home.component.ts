import { OnInit, OnDestroy, Component, HostListener } from '@angular/core'
import { KindRoom, WithTarget } from '@speek/core/entity'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { debounceTime, takeUntil } from 'rxjs/operators'
import { FormControl, Validators } from '@angular/forms'
import { ShareService } from '@speek/ui/components'
import { Clipboard } from '@angular/cdk/clipboard'
import { UUID } from '@speek/util/format'
import { Subject } from 'rxjs'

const copyText = (code: string, kindRoom: KindRoom = 'meet') => {
  const hello = 'Olá, conhece o Speek?'
  const howto = 'É só acessar speek.video e usar este código:'
  const link = 'Você pode acessar também clicando neste link:'
  const url = `https://speek.video/#/${code}/${kindRoom}`
  return `${hello}\n\n${howto}\n${code}\n\n${link}\n${url}`
}

@Component({
  selector: 'speek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>()

  code = new FormControl('', [Validators.pattern(UUID.regex)])

  @HostListener('document:paste', ['$event'])
  onPaste(event: WithTarget<HTMLInputElement>) {
    event.stopPropagation()
    event.preventDefault()
    if ('clipboardData' in event || 'clipboardData' in window) {
      const clipboardData: DataTransfer =
        (event as any).clipboardData || (window as any).clipboardData

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

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _share: ShareService,
    private _snackbar: MatSnackBar,
    readonly clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    const { code } = this._route.snapshot.params
    this.code.patchValue(code ?? '')
    this.code.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy))
      .subscribe(() => this.onCodeChange())
  }

  onCodeChange() {
    if (this.code.valid) {
      this._router.navigate(['/', this.code.value, 'meet'])
    }
  }

  create(kindRoom: KindRoom = 'meet') {
    const uuid = UUID.long()
    const config = { duration: 2800 }
    this.clipboard.copy(copyText(uuid, kindRoom))

    const message = this._snackbar.open(
      'Compartilhar chave agora?',
      'Sim',
      config
    )
    message.afterDismissed().subscribe(() => this.go(uuid, kindRoom))
    message.onAction().subscribe(() => {
      this._share
        .open({ uuid, kindRoom })
        .subscribe(() => this.go(uuid, kindRoom))
    })
  }

  go(code: string, kindRoom: KindRoom) {
    if (code) {
      this._router.navigate(['/', code, kindRoom])
    }
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
