// (window as any).SpeechRecognition = ((window as any).SpeechRecognition ||
// (window as any).webkitSpeechRecognition) as SpeechRecognition;

// (window as any).SpeechGrammarList = ((window as any).SpeechGrammarList ||
// (window as any).webkitSpeechGrammarList) as SpeechGrammarList;

// (window as any).SpeechRecognitionEvent =
// (window as any).SpeechRecognitionEvent ||
// (window as any).webkitSpeechRecognitionEvent;

declare global {
  interface SpeechGrammar {
    src: string
    weight: number
  }

  const SpeechGrammar: {
    prototype: SpeechGrammar
    new (): SpeechGrammar
  }

  interface SpeechGrammarList {
    readonly length: number
    addFromString(string: string, weight?: number): void
    addFromURI(src: string, weight?: number): void
    item(index: number): SpeechGrammar
    [index: number]: SpeechGrammar
  }

  const SpeechGrammarList: {
    prototype: SpeechGrammarList
    new (): SpeechGrammarList
  }

  interface SpeechRecognitionEventMap {
    audioend: Event
    audiostart: Event
    end: Event
    error: SpeechRecognitionError
    nomatch: SpeechRecognitionEvent
    result: SpeechRecognitionEvent
    soundend: Event
    soundstart: Event
    speechend: Event
    speechstart: Event
    start: Event
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    grammars: SpeechGrammarList
    interimResults: boolean
    lang: string
    maxAlternatives: number
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null
    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    onerror:
      | ((this: SpeechRecognition, ev: SpeechRecognitionError) => any)
      | null
    onnomatch:
      | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
      | null
    onresult:
      | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
      | null
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null
    serviceURI: string
    abort(): void
    start(): void
    stop(): void
    addEventListener<K extends keyof SpeechRecognitionEventMap>(
      type: K,
      listener: (
        this: SpeechRecognition,
        ev: SpeechRecognitionEventMap[K]
      ) => any,
      options?: boolean | AddEventListenerOptions
    ): void
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void
    removeEventListener<K extends keyof SpeechRecognitionEventMap>(
      type: K,
      listener: (
        this: SpeechRecognition,
        ev: SpeechRecognitionEventMap[K]
      ) => any,
      options?: boolean | EventListenerOptions
    ): void
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ): void
  }

  const SpeechRecognition: {
    prototype: SpeechRecognition
    new (): SpeechRecognition
  }

  // interface SpeechRecognitionAlternative {
  //   readonly confidence: number;
  //   readonly transcript: string;
  // }

  // const SpeechRecognitionAlternative: {
  //   prototype: SpeechRecognitionAlternative;
  //   new (): SpeechRecognitionAlternative;
  // };

  interface SpeechRecognitionError extends Event {
    // readonly error: SpeechRecognitionErrorCode;
    readonly message: string
  }

  const SpeechRecognitionError: {
    prototype: SpeechRecognitionError
    new (): SpeechRecognitionError
  }

  interface SpeechRecognitionEvent extends Event {
    readonly emma: Document | null
    readonly interpretation: any
    readonly resultIndex: number
    readonly results: SpeechRecognitionResultList
  }

  const SpeechRecognitionEvent: {
    prototype: SpeechRecognitionEvent
    new (): SpeechRecognitionEvent
  }

  // interface SpeechRecognitionResult {
  //   readonly isFinal: boolean;
  //   readonly length: number;
  //   item(index: number): SpeechRecognitionAlternative;
  //   [index: number]: SpeechRecognitionAlternative;
  // }

  // const SpeechRecognitionResult: {
  //   prototype: SpeechRecognitionResult;
  //   new (): SpeechRecognitionResult;
  // };

  // interface SpeechRecognitionResultList {
  //   readonly length: number;
  //   item(index: number): SpeechRecognitionResult;
  //   [index: number]: SpeechRecognitionResult;
  // }

  // const SpeechRecognitionResultList: {
  //   prototype: SpeechRecognitionResultList;
  //   new (): SpeechRecognitionResultList;
  // };
}

// var SpeechRecognition =
//   SpeechRecognition || (window as any).webkitSpeechRecognition
// var SpeechGrammarList =
//   SpeechGrammarList || (window as any).webkitSpeechGrammarList
// var SpeechRecognitionEvent =
//   SpeechRecognitionEvent || (window as any).webkitSpeechRecognitionEvent

// // (window as any).SpeechRecognition =
// //   (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || (window as any).mozSpeechRecognition
// //     (window as any).SpeekGrammarList =
// // (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList
// //   (window as any).SpeekRecognitionEvent =
// // (window as any).SpeechRecognitionEvent ||
// //   (window as any).webkitSpeechRecognitionEvent

// export { SpeechRecognition, SpeechGrammarList, SpeechRecognitionEvent }

export {}
