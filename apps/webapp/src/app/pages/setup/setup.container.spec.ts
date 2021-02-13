import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupContainer } from './setup.container';

describe('SetupContainer', () => {
  let component: SetupContainer;
  let fixture: ComponentFixture<SetupContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
