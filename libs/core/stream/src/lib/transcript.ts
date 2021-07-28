import { BehaviorSubject } from 'rxjs'
export interface SpeehConfig {
  lang: string
  grammars: SpeechGrammarList
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
}

export class Transcript {
  speech: SpeechRecognition

  private _result = new BehaviorSubject<string>('')
  public result$ = this._result.asObservable()

  constructor({
    lang = 'pt-br',
    grammars = new SpeechGrammarList(),
    continuous = true,
    interimResults = false,
    maxAlternatives = 10,
  }: SpeehConfig) {
    this.speech = new SpeechRecognition()
    this.speech.lang = lang
    this.speech.grammars = grammars
    this.speech.continuous = continuous
    this.speech.interimResults = interimResults
    this.speech.maxAlternatives = maxAlternatives

    this.speech.onresult = ({ results, resultIndex }) => {
      const result = results.item(resultIndex)
      if (result.isFinal) {
        this._result.next(result.item(0).transcript)
      }
    }
  }
}
