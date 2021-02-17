import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { routerTransition } from '../../app.animation'

@Component({
  selector: 'speek-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  readonly links = [
    { route: '/setting/audio', label: 'Áudio' },
    { route: '/setting/video', label: 'Vídeo' },
  ]
  constructor(readonly router: Router) {}
}
