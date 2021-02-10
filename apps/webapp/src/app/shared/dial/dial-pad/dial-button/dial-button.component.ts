import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'
import { ThemePalette } from '@angular/material/core'

@Component({
  selector: 'speek-dial-button',
  templateUrl: './dial-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialButtonComponent {
  @Input() digit: string | number
  @Input() color?: ThemePalette
  @Input() icon?: string
  @Output() clicked = new EventEmitter<string | number>()
}
