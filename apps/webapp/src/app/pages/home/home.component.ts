import { takeUntil, takeWhile } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatHorizontalStepper } from '@angular/material/stepper'
import { StreamAdapter } from './../../adapters/stream.adapter'
import { from, Subject } from 'rxjs'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'

@Component({
  selector: 'speek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  // @ViewChild('stepper') stepper: MatHorizontalStepper
  destroy = new Subject<void>()

  isLinear = false

  tiles = [
    { path: '/newcode', label: 'Room', icon: 'meeting_room' },
    { path: '/newcode/hall', label: 'Hall', icon: 'mic' }
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

  constructor(private _fb: FormBuilder, private _stream: StreamAdapter) {}

  ngAfterViewInit(): void {
    console.log(this._stream)
    // console.log(this.stepper)
    // from(this.stepper.selectionChange)
    //   .pipe(
    //     takeUntil(this.destroy),
    //     takeWhile((v) => v.selectedIndex === 1)
    //   )
    //   .subscribe(() => {})
    // this.stepper.selectionChange
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe(async ({ selectedIndex }) => {
    //     console.log(selectedIndex)
    //     if (selectedIndex === 0) {
    //       this._stream.getStream({ video: true }).then((stream) => {
    //         console.log(stream)
    //       })
    //     } else {
    //       this._stream.stopStream()
    //     }
    //     if (selectedIndex === 1) {
    //       this._stream.getStream({ audio: true })
    //     } else {
    //       this._stream.stopStream()
    //     }
    //   })
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
