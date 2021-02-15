import { TestBed } from '@angular/core/testing';

import { InviteGuard } from './invite.guard';

describe('InviteGuard', () => {
  let guard: InviteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InviteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
