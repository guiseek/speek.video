import { Directive, ViewContainerRef } from '@angular/core'
@Directive({
  selector: '[meetAddon]',
})
export class MeetAddonDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
