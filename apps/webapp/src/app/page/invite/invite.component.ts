import { FormControl, FormGroup, Validators } from '@angular/forms'
import { takeUntil, debounceTime } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { UserRoomStorage } from '@speek/data/storage'
import { MatInput } from '@angular/material/input'
import { stopStream } from '@speek/core/stream'
import { BehaviorSubject, Subject } from 'rxjs'
import { UserRoom, WithTarget } from '@speek/core/entity'
import { UUID } from '@speek/util/format'
import {
  Component,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>()

  @ViewChild(MatInput) input: MatInput

  stream: MediaStream
  comeInOut = new BehaviorSubject<boolean>(false)

  @HostBinding('class.zoom')
  public get enter(): boolean {
    return this.comeInOut.value
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: WithTarget<HTMLInputElement>) {
    event.stopPropagation()
    event.preventDefault()
    if ('clipboardData' in event || 'clipboardData' in window) {
      const clipboardData: DataTransfer =
        (event as any).clipboardData || (window as any).clipboardData

      this.code.patchValue(
        clipboardData
          .getData('Text')
          .replace('https://speek.video/#/invite/', '')
      )
      event.target.blur()
    }
  }

  form = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.pattern(UUID.regex),
    ]),
  })

  get code() {
    return this.form.get('code') as FormControl
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userRoom: UserRoomStorage
  ) {}

  ngOnInit(): void {
    const { code } = this._route.snapshot.params
    this.form.patchValue({ code: code ?? '' })
    this.form.valueChanges
      .pipe(debounceTime(600), takeUntil(this._destroy))
      .subscribe(() => this.onCodeChange())
  }

  onCodeChange() {
    if (this.form.valid) {
      const code = this.code.value
      setTimeout(() => this.comeInOut.next(true), 1000)
      this._userRoom.update(UserRoom.fromJson(this.form.value))
      setTimeout(() => this._router.navigate(['/', code, 'meet']), 3000)
    }
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
    this._destroy.next()
    this._destroy.complete()
  }
}
