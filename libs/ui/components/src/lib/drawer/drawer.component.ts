import { MatDrawer } from '@angular/material/sidenav'
import { MediaMatcher } from '@angular/cdk/layout'
import { DrawerService } from './drawer.service'
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'speek-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild('drawer') drawer!: MatDrawer
  private _mobileQueryListener: () => void
  private mobileQuery: MediaQueryList

  @HostBinding('class.is-mobile')
  public get isMobile() {
    return this.mobileQuery.matches
  }

  constructor(
    readonly drawerShell: DrawerService,
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
