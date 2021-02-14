import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { ShareService } from '@speek/ui/components'
import { MatInput } from '@angular/material/input'
import { BehaviorSubject, Subject } from 'rxjs'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'speek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  // @ViewChild('stepper') stepper: MatHorizontalStepper
  destroy = new Subject<void>()

  code = new FormControl('', Validators.required)

  enter = false
  doorOpen = false

  tiles = [
    { path: '/newcode', label: 'Room', icon: 'meeting_room' },
    { path: '/newcode/hall', label: 'Hall', icon: 'mic' },
  ]

  videoGroup: FormGroup = this._fb.group({
    video: ['', Validators.required],
  })
  voiceGroup: FormGroup = this._fb.group({
    voice: ['', Validators.required],
  })
  pitchGroup: FormGroup = this._fb.group({
    pitch: [1, Validators.required],
  })

  @ViewChild(MatInput)
  private input: MatInput

  comeInOut = new BehaviorSubject<boolean>(false)

  ready = false
  constructor(private _fb: FormBuilder, private _share: ShareService) {}

  ngAfterViewInit(): void {
    this.ready = true
    this.comeInOut
      .pipe(
        tap((v) => {
          console.log(v, this.input)
          if (v) {
            setTimeout(() => this.input.focus(), 500)
          }
        })
      )
      .subscribe()
  }

  ngOnInit() {}

  share() {
    this._share.open([]).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
