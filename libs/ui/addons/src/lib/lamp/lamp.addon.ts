import { AfterContentInit, Component, ContentChild } from '@angular/core'
import { SwitchAddon } from './switch/switch.addon'

@Component({
  selector: 'speek-lamp',
  templateUrl: './lamp.addon.html',
  styleUrls: ['./lamp.addon.scss'],
})
export class LampAddon implements AfterContentInit {
  @ContentChild(SwitchAddon) switch!: SwitchAddon

  ngAfterContentInit(): void {
    console.log(this.switch)
  }
}
