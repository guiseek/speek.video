export interface SpeekMessage {
  from: string
  type: 'message' | 'file'
  data: any
}
