import {
  Component,
} from '@angular/core'
import { routerTransition } from './app.animation'
import { DrawerShellService } from '@speek/ui/components'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent {
  constructor(readonly drawerShell: DrawerShellService) {}
}
