import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'speek-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        .mat-tab-nav-bar {
          width: 100%;
        }
      }
    `,
  ],
})
export class NavbarComponent {}
