import { UUID } from './uuid'

describe('UUID', () => {
  it('should return an uuid', () => {
    expect(UUID.long()).toBeDefined()
  })

  it('should return an short uuid', () => {
    expect(UUID.short().length).toEqual(8)
  })

  it('should return an uuid', () => {
    expect(UUID.short().length).toEqual(8)
  })

  it('should return an valid uuid', () => {
    expect(UUID.isValid(UUID.long())).toBeTruthy()
  })
})
