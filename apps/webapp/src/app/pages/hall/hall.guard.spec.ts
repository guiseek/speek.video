import { TestBed } from '@angular/core/testing'

import { HallGuard } from './hall.guard'

describe('HallGuard', () => {
  let guard: HallGuard

  beforeEach(() => {
    TestBed.configureTestingModule({})
    guard = TestBed.inject(HallGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
