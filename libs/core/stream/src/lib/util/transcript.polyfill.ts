var SpeechRecognition =
  SpeechRecognition || (window as any).webkitSpeechRecognition
var SpeechGrammarList =
  SpeechGrammarList || (window as any).webkitSpeechGrammarList
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || (window as any).webkitSpeechRecognitionEvent

// (window as any).SpeechRecognition =
//   (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || (window as any).mozSpeechRecognition
//     (window as any).SpeekGrammarList =
// (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList
//   (window as any).SpeekRecognitionEvent =
// (window as any).SpeechRecognitionEvent ||
//   (window as any).webkitSpeechRecognitionEvent

export { SpeechRecognition, SpeechGrammarList, SpeechRecognitionEvent }
