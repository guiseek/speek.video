import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconRegistry } from '@angular/material/icon'
import { RouterTestingModule } from '@angular/router/testing'
import { MaterialModule } from './shared/material.module'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { NavbarModule } from './navbar/navbar.module'
import { DomSanitizer } from '@angular/platform-browser'
import { createSpeekIcon, getLogo } from './utils/speek-icon'
import { Signaling } from './adapters/signaling.adapter'

describe('AppComponent', () => {
  let registry: MatIconRegistry
  let sanitize: DomSanitizer
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        NavbarModule,
        MaterialModule,
      ],
      providers: [Signaling],
    }).compileComponents()

    registry = TestBed.inject(MatIconRegistry)
    sanitize = TestBed.inject(DomSanitizer)
    createSpeekIcon(registry, sanitize)
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'webapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('webapp')
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('mat-icon').innerHTML).toEqual(
      getLogo('#d32f2f')
    )
  })
})
