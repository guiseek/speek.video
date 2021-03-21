import { SpeekError } from './speek-error'

describe('SpeekError', () => {
  it('should create an instance', () => {
    expect(new SpeekError(new Error())).toBeTruthy()
  })
})
