import { Observable } from 'rxjs'

export abstract class Storage {
  abstract readonly size: Observable<number>

  abstract get(key: string): Observable<unknown | undefined>
  abstract set(key: string, data: unknown): Observable<undefined>
  abstract delete(key: string): Observable<undefined>
  abstract clear(): Observable<undefined>
  abstract keys(): Observable<string>
  abstract has(key: string): Observable<boolean>
}
