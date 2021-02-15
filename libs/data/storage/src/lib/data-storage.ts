import { deepMerge } from '@speek/util/format'
import { Subject } from 'rxjs'
export abstract class DataStorage<T = any> {
  onUpdate = new Subject<T>()

  protected abstract key: string

  merge(data: Partial<T>) {
    try {
      return deepMerge(this.getStoredValue(), data)
    } catch (err) {
      console.error(err)
    }
  }

  update(data: Partial<T>) {
    try {
      const value = this.merge(data)
      this.store(value)
      this.onUpdate.next(value)
    } catch (err) {
      console.error(err)
    }
  }

  store(value: T) {
    try {
      localStorage.setItem(this.key, JSON.stringify(value))
      this.onUpdate.next(value)
    } catch (err) {
      console.error(err)
    }
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
