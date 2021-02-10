import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSelectModule } from '@angular/material/select'
import { ControlAccessor } from './../control-accessor'
import {
  ReactiveFormsModule,
  FormsModule,
  NgControl,
  FormControl,
} from '@angular/forms'
import { DevicesComponent } from './devices.component'

describe('DevicesComponent', () => {
  let component: DevicesComponent
  let fixture: ComponentFixture<DevicesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicesComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      providers: [
        ControlAccessor,
        { provide: NgControl, useValue: { control: new FormControl() } },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
