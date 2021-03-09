export class SystemSound {
  private _dir = 'system'

  loading = `${this._dir}/loading`

  refreshFeed = `${this._dir}/refresh-feed`
}

export class HeroSound {
  private _dir = 'hero'

  simple(level: 1 | 2 | 3) {
    return `${this._dir}/simple-celebration-${level}`
  }
  decorative(level: 1 | 2 | 3) {
    return `${this._dir}/decorative-celebration-${level}`
  }
}

export class NotificationSound {
  private _dir = 'notification'

  ambient = `${this._dir}/ambient`

  highIntensity = `${this._dir}/high-intensity`

  simple(level: 1 | 2) {
    return `${this._dir}/simple-${level}`
  }

  decorative(level: 1 | 2) {
    return `${this._dir}/decorative-${level}`
  }
}

export class AppSound {
  private _dir = '/assets/sounds/'
  private _audio = new Audio()

  public hero = new HeroSound()

  public system = new SystemSound()

  public notification = new NotificationSound()

  play(path: string) {
    const src = [this._dir, path, '.ogg']
    this._audio.src = src.join('')
    return this._audio.play()
  }
}
