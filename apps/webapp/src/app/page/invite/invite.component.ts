import { UserRoomForm } from './../../../../../../libs/ui/components/src/lib/forms/user-room.form'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { drawOscilloscope } from '@speek/ui/components'
import { UserSetupStorage } from '@speek/data/storage'
import { stopStream, Voice } from '@speek/core/stream'
import { takeUntil } from 'rxjs/operators'
import { UUID } from '@speek/util/format'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Subject } from 'rxjs'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()

  stream: MediaStream
  comeInOut = new BehaviorSubject<boolean>(false)
  enter = false

  form = new UserRoomForm()

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    readonly userSetup: UserSetupStorage
  ) {
    const { code = '' } = this._route.snapshot.params
    this.form.patchValue({ code })
    console.log(code)
    if (this.form.code) {
    }
  }

  ngOnInit(): void {
    const value = this.userSetup.getStoredValue()
    this.form.patchValue(!!value ? value : {})
  }

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true } })
  }

  onSave() {
    if (this.form.valid) {
      this.userSetup.store(this.form.value)
      this.form.markAsPristine()
      this._router.navigate(['/', 'newcode'])
      console.log(this.form.value)
    }
  }

  onLogin() {
    if (this.form.code.valid) {
      this.comeInOut.next(!this.comeInOut.value)
      this.enter = true
      setTimeout(() => {
        this._router.navigate(['/', this.form.code.value])
      }, 3000)
    } else {
      this.comeInOut.next(!this.comeInOut.value)
      this.comeInOut.next(!this.comeInOut.value)
    }
  }

  ngOnDestroy(): void {
    if (this.stream) {
      stopStream(this.stream)
    }
    this._destroy.next()
    this._destroy.complete()
  }

  onSubmit() {
    if (this.form.valid) {
      this.userSetup.store(this.form.value)
      this._router.navigate(['/', this.form.code.value])
    }
  }
}
