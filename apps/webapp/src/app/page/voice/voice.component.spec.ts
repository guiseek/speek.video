import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceComponent } from './voice.component';

describe('VoiceComponent', () => {
  let component: VoiceComponent;
  let fixture: ComponentFixture<VoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
