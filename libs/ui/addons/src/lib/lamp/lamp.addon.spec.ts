import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampAddon } from './lamp.addon';

describe('LampAddon', () => {
  let component: LampAddon;
  let fixture: ComponentFixture<LampAddon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LampAddon ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LampAddon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
