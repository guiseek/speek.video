import { utilShare } from './util-share'

describe('utilShare', () => {
  it('should work', () => {
    expect(utilShare({ title: '', url: '', text: '' }, 'copy')).toEqual('util-share')
  })
})
