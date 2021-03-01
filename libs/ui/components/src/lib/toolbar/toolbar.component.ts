import { ThemePalette } from '@angular/material/core'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'speek-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() color: ThemePalette
}
