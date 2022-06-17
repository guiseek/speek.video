/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone' // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition
    webkitSpeechRecognition: SpeechRecognition
    SpeechGrammarList: SpeechGrammarList
    webkitSpeechGrammarList: SpeechGrammarList
    SpeechRecognitionEvent: SpeechRecognitionEvent
    webkitSpeechRecognitionEvent: SpeechRecognitionEvent
  }
}

import '@speek/core/stream'
window.SpeechRecognition = (window.SpeechRecognition ||
  window.webkitSpeechRecognition) as SpeechRecognition
window.SpeechGrammarList = (window.SpeechGrammarList ||
  window.webkitSpeechGrammarList) as SpeechGrammarList
window.SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

// declare global {
//   interface SpeechGrammar {
//     src: string;
//     weight: number;
//   }

//   const SpeechGrammar: {
//     prototype: SpeechGrammar;
//     new (): SpeechGrammar;
//   };

//   interface SpeechGrammarList {
//     readonly length: number;
//     addFromString(string: string, weight?: number): void;
//     addFromURI(src: string, weight?: number): void;
//     item(index: number): SpeechGrammar;
//     [index: number]: SpeechGrammar;
//   }

//   const SpeechGrammarList: {
//     prototype: SpeechGrammarList;
//     new (): SpeechGrammarList;
//   };

//   interface SpeechRecognitionEventMap {
//     audioend: Event;
//     audiostart: Event;
//     end: Event;
//     error: SpeechRecognitionError;
//     nomatch: SpeechRecognitionEvent;
//     result: SpeechRecognitionEvent;
//     soundend: Event;
//     soundstart: Event;
//     speechend: Event;
//     speechstart: Event;
//     start: Event;
//   }

//   interface SpeechRecognition extends EventTarget {
//     continuous: boolean;
//     grammars: SpeechGrammarList;
//     interimResults: boolean;
//     lang: string;
//     maxAlternatives: number;
//     onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
//     onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
//     onend: ((this: SpeechRecognition, ev: Event) => any) | null;
//     onerror:
//       | ((this: SpeechRecognition, ev: SpeechRecognitionError) => any)
//       | null;
//     onnomatch:
//       | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
//       | null;
//     onresult:
//       | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
//       | null;
//     onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
//     onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
//     onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
//     onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
//     onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
//     serviceURI: string;
//     abort(): void;
//     start(): void;
//     stop(): void;
//     addEventListener<K extends keyof SpeechRecognitionEventMap>(
//       type: K,
//       listener: (
//         this: SpeechRecognition,
//         ev: SpeechRecognitionEventMap[K]
//       ) => any,
//       options?: boolean | AddEventListenerOptions
//     ): void;
//     addEventListener(
//       type: string,
//       listener: EventListenerOrEventListenerObject,
//       options?: boolean | AddEventListenerOptions
//     ): void;
//     removeEventListener<K extends keyof SpeechRecognitionEventMap>(
//       type: K,
//       listener: (
//         this: SpeechRecognition,
//         ev: SpeechRecognitionEventMap[K]
//       ) => any,
//       options?: boolean | EventListenerOptions
//     ): void;
//     removeEventListener(
//       type: string,
//       listener: EventListenerOrEventListenerObject,
//       options?: boolean | EventListenerOptions
//     ): void;
//   }

//   const SpeechRecognition: {
//     prototype: SpeechRecognition;
//     new (): SpeechRecognition;
//   };

//   // interface SpeechRecognitionAlternative {
//   //   readonly confidence: number;
//   //   readonly transcript: string;
//   // }

//   // const SpeechRecognitionAlternative: {
//   //   prototype: SpeechRecognitionAlternative;
//   //   new (): SpeechRecognitionAlternative;
//   // };

//   interface SpeechRecognitionError extends Event {
//     // readonly error: SpeechRecognitionErrorCode;
//     readonly message: string;
//   }

//   const SpeechRecognitionError: {
//     prototype: SpeechRecognitionError;
//     new (): SpeechRecognitionError;
//   };

//   interface SpeechRecognitionEvent extends Event {
//     readonly emma: Document | null;
//     readonly interpretation: any;
//     readonly resultIndex: number;
//     readonly results: SpeechRecognitionResultList;
//   }

//   const SpeechRecognitionEvent: {
//     prototype: SpeechRecognitionEvent;
//     new (): SpeechRecognitionEvent;
//   };

//   // interface SpeechRecognitionResult {
//   //   readonly isFinal: boolean;
//   //   readonly length: number;
//   //   item(index: number): SpeechRecognitionAlternative;
//   //   [index: number]: SpeechRecognitionAlternative;
//   // }

//   // const SpeechRecognitionResult: {
//   //   prototype: SpeechRecognitionResult;
//   //   new (): SpeechRecognitionResult;
//   // };

//   // interface SpeechRecognitionResultList {
//   //   readonly length: number;
//   //   item(index: number): SpeechRecognitionResult;
//   //   [index: number]: SpeechRecognitionResult;
//   // }

//   // const SpeechRecognitionResultList: {
//   //   prototype: SpeechRecognitionResultList;
//   //   new (): SpeechRecognitionResultList;
//   // };
// }
