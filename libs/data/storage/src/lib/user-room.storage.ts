import { DataStorage } from './data-storage'
import { UserRoom } from '@speek/core/entity'

export class UserRoomStorage extends DataStorage<UserRoom> {
  protected key = 'user_room'
}
