import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyComponent } from './frequency.component';

describe('FrequencyComponent', () => {
  let component: FrequencyComponent;
  let fixture: ComponentFixture<FrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
