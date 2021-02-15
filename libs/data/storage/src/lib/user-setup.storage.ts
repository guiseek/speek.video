import { DataStorage } from './data-storage'
import { UserSetup } from '@speek/core/entity'

export class UserSetupStorage extends DataStorage<UserSetup> {
  protected key = 'user_setup'
}
