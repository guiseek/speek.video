import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialButtonComponent } from './dial-button.component'

describe('DialButtonComponent', () => {
  let component: DialButtonComponent
  let fixture: ComponentFixture<DialButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialButtonComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
