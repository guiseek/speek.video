export class UserRoom {
  code: string

  readonly start: number

  end = 0

  get duration() {
    return this.start - this.end
  }

  constructor({ code, start, end }: Pick<UserRoom, 'code' | 'start' | 'end'>) {
    if (!start || start === 0) {
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
      start: new Date(this.start).toISOString(),
      end: this.end === 0 ? null : new Date(this.end).toISOString(),
      duration: this.duration,
    }
  }
}
