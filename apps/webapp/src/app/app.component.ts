import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core'
import { routerTransition } from './app.animation'
import { MediaMatcher } from '@angular/cdk/layout'
import { DrawerShellService } from '@speek/ui/components'
import { MatDrawer } from '@angular/material/sidenav'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent {
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

  constructor(readonly drawerShell: DrawerShellService) {}
}
