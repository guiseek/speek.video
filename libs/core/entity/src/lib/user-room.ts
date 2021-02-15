export class UserRoom {
  code: string

  private readonly start: number

  private end: number = 0

  get duration() {
    return this.start - this.end
  }

  constructor({ code, start, end = 0 }: UserRoom) {
    if (!start) {
      start = new Date().getTime()
    }
    this.code = code
    this.start = start
    this.end = end
  }

  static fromJson(json: UserRoom) {
    return new UserRoom(json)
  }

  serialize() {
    return {
      code: this.code,
      start: this.start,
      end: this.end,
      duration: this.duration,
    }
  }

  toJSON() {
    return {
      code: this.code,
      start: new Date(this.start),
      end: this.end === 0 ? null : new Date(this.end),
      duration: this.duration,
    }
  }
}
