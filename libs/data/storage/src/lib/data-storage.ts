import { Subject } from 'rxjs'

export abstract class DataStorage<T = any> {
  onUpdate = new Subject<T>()

  protected abstract key: string

  store(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}

    this.onUpdate.next(value)
  }

  getStoredValue(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
  }

  clearStorage(key: string) {
    try {
      localStorage.removeItem(key)
    } catch {}
  }
}

export function dataStorage(): string {
  return 'data-storage'
}
