import { UUID } from '@speek/util/format'
import { UserRoom } from './user-room'

describe('UserRoom', () => {
  let room: UserRoom

  beforeAll(() => {
    room = new UserRoom(UUID.long())
  })
  it('should create an instance', () => {
    expect(room).toBeDefined()
  })
  it('should create an instance', () => {
    expect(room.duration).toEqual(room['start'])
  })
  it('should create an instance', () => {
    const time = new Date().getTime()
    room.end = time
    expect(room.end).toEqual(time)
  })
  it('should create an instance', () => {
    const time = new Date().getTime()
    room.end = time
    expect(room.duration).toEqual(room['start'] - time)
  })
})
