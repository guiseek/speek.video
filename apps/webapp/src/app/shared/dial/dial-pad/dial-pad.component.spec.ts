import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialPadComponent } from './dial-pad.component'

describe('DialPadComponent', () => {
  let component: DialPadComponent
  let fixture: ComponentFixture<DialPadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialPadComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialPadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
