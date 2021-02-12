import { ButtonComponent } from './button/button.component'
import { ThemePalette } from '@angular/material/core'
import {
  Output,
  QueryList,
  Component,
  EventEmitter,
  ViewChildren,
} from '@angular/core'

export interface DialButtonInputs {
  digit: string | number
  color?: ThemePalette
  icon?: string
}

@Component({
  selector: 'speek-dialpad',
  templateUrl: './dialpad.component.html',
  styleUrls: ['./dialpad.component.scss'],
})
export class DialpadComponent {
  @ViewChildren(ButtonComponent)
  public buttons!: QueryList<ButtonComponent>

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
