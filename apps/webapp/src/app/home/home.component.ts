import { OnInit, OnDestroy, Component, HostListener } from '@angular/core'
import { debounceTime, filter, takeUntil } from 'rxjs/operators'
import { EventWithTarget } from '@speek/core/entity'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, Validators } from '@angular/forms'
import { ShareService } from '@speek/ui/components'
import { Clipboard } from '@angular/cdk/clipboard'
import { UUID } from '@speek/util/format'
import { Subject } from 'rxjs'

const copyText = (code: string) => {
  const hello = 'Olá, conhece o Speek?'
  const howto = 'É só acessar speek.video e usar este código:'
  const link = 'Você pode acessar também clicando neste link:'
  const url = `https://speek.video/#/${code}/meet`
  return `${hello}\n\n${howto}\n${code}\n\n${link}\n${url}`
}

function getClipboardData(event: ClipboardEvent): DataTransfer {
  return event.clipboardData ?? globalThis.clipboardData
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
  onPaste(event: EventWithTarget<ClipboardEvent>) {
    if ('clipboardData' in event) {
      const content = getClipboardData(event).getData('Text')
      const textPasted = UUID.getFromText(content)
      this.code.patchValue(textPasted.shift() ?? '')
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
    this.code.patchValue(code)
    this.code.valueChanges
      .pipe(
        debounceTime(400),
        takeUntil(this.destroy),
        filter(() => this.code.valid)
      )
      .subscribe((value) => this.go(value))
  }

  create() {
    const uuid = UUID.long()
    const config = { duration: 3600 }
    const textToShare = 'Compartilhar chave agora?'

    this.clipboard.copy(copyText(uuid))

    const message = this._snackbar.open(textToShare, 'Sim', config)

    message
      .onAction()
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this._share.open({ uuid, kindRoom: 'meet' }))

    this.go(uuid)
  }

  go(code: string) {
    const url = ['/', code, 'meet']
    this._router.navigate(url)
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
