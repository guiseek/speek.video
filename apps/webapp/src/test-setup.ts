import 'jest-preset-angular'
import 'jest-ts-auto-mock'

// import { getTestBed } from '@angular/core/testing'
// import {
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting,
// } from '@angular/platform-browser-dynamic/testing'

// getTestBed().resetTestEnvironment()
// getTestBed().initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting(),
//   { teardown: { destroyAfterEach: false } }
// )

Object.defineProperty(window, 'RTCPeerConnectionState', {
  value: 'stable',
})
