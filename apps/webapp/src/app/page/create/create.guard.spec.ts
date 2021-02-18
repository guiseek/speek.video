import { RouterTestingModule } from '@angular/router/testing'
import { TestBed } from '@angular/core/testing'

import { CreateGuard } from './create.guard'

describe('CreateGuard', () => {
  let guard: CreateGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    })
    guard = TestBed.inject(CreateGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
