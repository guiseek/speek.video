import { routerTransition } from './app.animation'
import { Component } from '@angular/core'

@Component({
  selector: 'speek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent {}
