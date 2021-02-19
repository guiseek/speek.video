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
      setTimeout(() => this.comeInOut.next(true), 400)
      this._userRoom.update(UserRoom.fromJson(this.form.value))
      setTimeout(() => this._router.navigate(['/', code, 'meet']), 2400)
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
