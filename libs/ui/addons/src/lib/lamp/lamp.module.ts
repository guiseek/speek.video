import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LampAddon } from './lamp.addon';
import { SwitchAddon } from './switch/switch.addon'

@NgModule({
  declarations: [LampAddon, SwitchAddon],
  imports: [CommonModule],
  exports: [LampAddon, SwitchAddon],
})
export class LampAddonModule {}
