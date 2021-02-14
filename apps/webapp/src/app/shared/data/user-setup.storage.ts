import { Storage } from './storage'
import { UserSetup } from '@speek/core/entity'

export class UserSetupStorage extends Storage<UserSetup> {
  protected key = 'user_setup'
}
