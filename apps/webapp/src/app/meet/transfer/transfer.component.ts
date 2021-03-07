import { TransferService } from '@speek/ui/components'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'speek-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  @Input() data: RTCDataChannel

  constructor(readonly transfer: TransferService) {}

  ngOnInit(): void {}
}
