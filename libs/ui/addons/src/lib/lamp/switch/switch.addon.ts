import { Component, HostListener, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'speek-switch',
  templateUrl: './switch.addon.html',
  styleUrls: ['./switch.addon.scss'],
  exportAs: 'speekLampSwitch',
})
export class SwitchAddon {
  @Input() state = new BehaviorSubject<'on' | 'off'>('on')
  @HostListener('click', ['$event'])
  onClick() {
    console.log('lick')

    this.state.next(this.state.value === 'off' ? 'on' : 'off')
  }
}
