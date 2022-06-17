export class UUID {
  static long() {
    return UUID.base.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  static short() {
    const base = 'xxxxxxxx'
    return base.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  static little() {
    const base = 'xxxx'
    return base.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  static base = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  static reg =
    /(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/
  static regex =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i
  static isValid(value: string) {
    return UUID.regex.test(value)
  }

  static getFromText(value: string) {
    return new RegExp(UUID.reg).exec(value)
  }

  private static time() {
    let time = new Date().getTime()
    if ('performance' in window) {
      time += performance.now()
    }
    return time
  }
}
