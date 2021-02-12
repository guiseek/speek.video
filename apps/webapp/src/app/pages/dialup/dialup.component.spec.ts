import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialupComponent } from './dialup.component'

describe('DialupComponent', () => {
  let component: DialupComponent
  let fixture: ComponentFixture<DialupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialupComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
