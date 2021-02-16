import { TestBed } from '@angular/core/testing';

import { MeetGuard } from './meet.guard';

describe('MeetGuard', () => {
  let guard: MeetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MeetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
