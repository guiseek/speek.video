import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchAddon } from './switch.addon';

describe('SwitchAddon', () => {
  let component: SwitchAddon;
  let fixture: ComponentFixture<SwitchAddon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchAddon ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchAddon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
