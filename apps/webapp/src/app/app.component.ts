import { takeUntil, filter } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { DrawerService } from '@speek/ui/components'
import { routerTransition } from './app.animation'
import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private _destroy = new Subject<void>()
  constructor(
    @Inject(DOCUMENT) readonly doc: Document,
    readonly drawer: DrawerService,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this._router.events
      .pipe(
        takeUntil(this._destroy),
        filter((evt) => evt instanceof NavigationStart),
        // filter((evt) => evt instanceof NavigationEnd)
      )
      .subscribe((evt) => {
        this.doc.body.classList.toggle('spheers')
      })
  }
  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}
