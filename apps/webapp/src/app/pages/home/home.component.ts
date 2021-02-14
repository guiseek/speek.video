import { Component, OnDestroy } from '@angular/core'
import { ShareService } from '@speek/ui/components'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'speek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  destroy = new Subject<void>()
  constructor(private _router: Router, private _share: ShareService) {}
  share() {
    this._share
      .open()
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => this.go(res))
  }

  go(code: string) {
    if (code) {
      this._router.navigate(['/', code])
    }
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
