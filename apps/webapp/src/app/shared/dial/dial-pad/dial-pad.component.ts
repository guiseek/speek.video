import { ThemePalette } from '@angular/material/core'
import { DialButtonComponent } from './dial-button'
import {
  Output,
  QueryList,
  Component,
  ViewChildren,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'

export interface DialButtonInputs {
  digit: string | number
  color?: ThemePalette
  icon?: string
}

@Component({
  selector: 'speek-dial-pad',
  templateUrl: './dial-pad.component.html',
  styleUrls: ['./dial-pad.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialPadComponent {
  @ViewChildren(DialButtonComponent)
  public buttons: QueryList<DialButtonComponent>

  @Output() onClick = new EventEmitter<string | number>()

  digits: DialButtonInputs[] = [
    { digit: 1, color: 'accent' },
    { digit: 2, color: 'accent' },
    { digit: 3, color: 'accent' },
    { digit: 4, color: 'accent' },
    { digit: 5, color: 'accent' },
    { digit: 6, color: 'accent' },
    { digit: 7, color: 'accent' },
    { digit: 8, color: 'accent' },
    { digit: 9, color: 'accent' },
    { digit: 0, color: 'accent' },
    { digit: '*', icon: 'star' },
    { digit: '#', icon: 'tag' },
  ]
}
