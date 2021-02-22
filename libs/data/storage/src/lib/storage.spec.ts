import { Observable, of } from 'rxjs'
import { Storage } from './storage'

class Db implements Storage {
  size: Observable<number>
  get(key: string): Observable<unknown> {
    return of({})
  }
  set(key: string, data: unknown): Observable<undefined> {
    return of(undefined)
  }
  delete(key: string): Observable<undefined> {
    return of(undefined)
  }
  clear(): Observable<undefined> {
    return of(undefined)
  }
  keys(): Observable<string> {
    return of('')
  }
  has(key: string): Observable<boolean> {
    return of(false)
  }
}

describe('Storage', () => {
  it('should create an instance', () => {
    expect(new Db()).toBeTruthy()
  })
})
