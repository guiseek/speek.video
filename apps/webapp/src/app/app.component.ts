import { Component } from '@angular/core'
import { routerTransition } from './app.animation'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent {
  title = 'webapp'
}
