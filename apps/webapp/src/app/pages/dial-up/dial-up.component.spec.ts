import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialUpComponent } from './dial-up.component';

describe('DialUpComponent', () => {
  let component: DialUpComponent;
  let fixture: ComponentFixture<DialUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
