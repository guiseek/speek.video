import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampComponent } from './lamp.component';

describe('LampComponent', () => {
  let component: LampComponent;
  let fixture: ComponentFixture<LampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
