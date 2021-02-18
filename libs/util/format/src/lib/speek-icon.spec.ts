import { getLogo } from './speek-logo'

describe('getLogo', () => {
  it('should create an instance', () => {
    expect(getLogo('#d32f2f')).toBeTruthy()
  })
})
