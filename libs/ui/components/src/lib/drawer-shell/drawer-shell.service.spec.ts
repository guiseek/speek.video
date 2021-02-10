import { TestBed } from '@angular/core/testing';

import { DrawerShellService } from './drawer-shell.service';

describe('DrawerShellService', () => {
  let service: DrawerShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
