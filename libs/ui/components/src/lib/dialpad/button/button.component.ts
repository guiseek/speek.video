import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ThemePalette } from '@angular/material/core'

@Component({
  selector: 'speek-dialpad-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() digit!: string | number
  @Input() color?: ThemePalette
  @Input() icon?: string
  @Output() clicked = new EventEmitter<string | number>()
}
