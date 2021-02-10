import { getLogo } from './speek-icon'

describe('getLogo', () => {
  it('should create an instance', () => {
    expect(getLogo('#d32f2f')).toBeTruthy()
  })
})
