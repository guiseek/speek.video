export interface SpeekMessage<T = any> {
  from: string
  type: 'message' | 'file'
  data: T
}
