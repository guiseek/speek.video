import { DrawerShellService } from './drawer-shell.service'
import { MatDrawer } from '@angular/material/sidenav'
import { MediaMatcher } from '@angular/cdk/layout'
import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  HostBinding,
} from '@angular/core'

@Component({
  selector: 'speek-drawer-shell',
  templateUrl: './drawer-shell.component.html',
  styleUrls: ['./drawer-shell.component.scss'],
})
export class DrawerShellComponent implements AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer

  private mobileQuery: MediaQueryList

  @HostBinding('class.is-mobile')
  public get isMobile() {
    return this.mobileQuery.matches
  }

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`)

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  )

  private _mobileQueryListener: () => void

  constructor(
    readonly drawerShell: DrawerShellService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }

  ngAfterViewInit(): void {
    this.drawerShell.setDrawer(this.drawer)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener)
  }
}
