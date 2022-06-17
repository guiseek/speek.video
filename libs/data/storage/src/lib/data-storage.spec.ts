import { DataStorage } from './data-storage'

class TestDataStorage extends DataStorage<unknown> {
  protected key = 'test'
}

describe('DataStorage', () => {
  it('should work', () => {
    expect(new TestDataStorage()).toBeDefined()
  })
})
