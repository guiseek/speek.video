import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveDialog } from './wave.dialog';

describe('WaveDialog', () => {
  let component: WaveDialog;
  let fixture: ComponentFixture<WaveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaveDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
