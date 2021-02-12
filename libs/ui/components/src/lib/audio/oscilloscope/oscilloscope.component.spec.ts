import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OscilloscopeComponent } from './oscilloscope.component';

describe('OscilloscopeComponent', () => {
  let component: OscilloscopeComponent;
  let fixture: ComponentFixture<OscilloscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OscilloscopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OscilloscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
