import { createMock } from 'ts-auto-mock'
import { UserSetup } from './user-setup'

describe('UserSetup', () => {
  let mock: UserSetup
  let setup: UserSetup

  beforeEach(() => {
    setup = new UserSetup()
    mock = createMock<UserSetup>()
  })
  it('should create an instance', () => {
    expect(setup).toBeTruthy()
    expect(mock).toBeTruthy()
  })
})
