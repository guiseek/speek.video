import {
  Input,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core'

@Component({
  selector: 'speek-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashComponent {
  @Input()
  width: string = '200px'

  @Input() message: string = ''
}
