import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerShellComponent } from './drawer-shell.component';

describe('DrawerShellComponent', () => {
  let component: DrawerShellComponent;
  let fixture: ComponentFixture<DrawerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
