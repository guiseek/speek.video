import { Component, HostBinding, Input, OnInit } from '@angular/core'

@Component({
  selector: 'speek-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {
  network = '#000'
  fire = '#d32f2f'

  @Input()
  networkClass = 'speek-network'

  @Input()
  fireClass = 'speek-fire'

  @Input()
  @HostBinding('class')
  get animationClass() {
    return 'slide-in-elliptic-bottom-bck'
  }

  constructor() {}

  ngOnInit(): void {}
}
