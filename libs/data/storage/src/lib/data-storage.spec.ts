import { DataStorage } from './data-storage'

class TestDataStorage extends DataStorage<any> {
  protected key: string = 'test'
}

describe('DataStorage', () => {
  it('should work', () => {
    expect(new TestDataStorage()).toBeDefined()
  })
})
