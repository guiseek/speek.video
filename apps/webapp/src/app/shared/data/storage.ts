import { Subject } from 'rxjs'

export abstract class Storage<T = any> {
  onUpdate = new Subject<T>()

  protected abstract key: string

  store(value: T) {
    try {
      localStorage.setItem(this.key, JSON.stringify(value))
    } catch {}

    this.onUpdate.next(value)
  }

  getStoredValue(): T | null {
    try {
      return JSON.parse(localStorage.getItem(this.key)) ?? {}
    } catch {
      return null
    }
  }

  clearStorage() {
    try {
      localStorage.removeItem(this.key)
    } catch {}
  }
}
