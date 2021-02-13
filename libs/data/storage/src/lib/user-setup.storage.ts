import { Subject } from 'rxjs'
import { DataStorage } from './data-storage'

export class UserSetup extends DataStorage<any> {
  onUpdate: Subject<any> = new Subject<any>()
  protected key: string = 'user-setup'
}
