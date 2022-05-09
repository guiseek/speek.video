import { Transcript } from './transcript'

describe('Transcript', () => {
  it('should create an instance', () => {
    expect(
      new Transcript({
        lang: 'pt-br',
        continuous: true,
        maxAlternatives: 1,
        grammars: null,
        interimResults: null,
      })
    ).toBeTruthy()
  })
})
