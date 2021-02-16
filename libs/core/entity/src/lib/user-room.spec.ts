import { createMock } from 'ts-auto-mock'
import { UserRoom } from './user-room'

// Mock values
const code = '86a1b3f0-50b5-4532-bcb2-dcdc04d8c6a4'
const start = 1613434390296
const end = 1613434906228

describe('UserRoom', () => {
  let mock: UserRoom
  let room: UserRoom

  beforeEach(() => {
    mock = createMock<UserRoom>({ code, start })
    room = new UserRoom({ code, start, end: 0 })
  })

  it('should to be defined', () => {
    expect(room).toBeDefined()
  })

  it('should create an instance', () => {
    expect(room).toBeInstanceOf(UserRoom)
  })

  it('should duration equal start when end has not defined', () => {
    expect(room.duration).toEqual(room.start)
  })

  it('the end must be defined', () => {
    room.end = end
    expect(room.end).toEqual(end)
  })

  it('the duration must be start minus end, when the end is defined', () => {
    room.end = end
    expect(room.duration).toEqual(start - end)
  })
  it('should return the information and date in numbers', () => {
    room.end = end
    expect(room.serialize()).toStrictEqual({
      code: '86a1b3f0-50b5-4532-bcb2-dcdc04d8c6a4',
      start: 1613434390296,
      end: 1613434906228,
      duration: -515932,
    })
  })
  it('should return the information and date in strings', () => {
    room.end = end
    expect(room.toJSON()).toStrictEqual({
      code: '86a1b3f0-50b5-4532-bcb2-dcdc04d8c6a4',
      start: '2021-02-16T00:13:10.296Z',
      end: '2021-02-16T00:21:46.228Z',
      duration: -515932,
    })
  })
})
