export type Share = ShareData & {
  title: string
  text: string
  hashtags?: string
}

export interface ShareOption {
  shareTitle: string
  cancel: string
  copy: string
  print: string
  email: string
  selectSms?: string
}

export interface ShareSocial {
  sms: string
  messenger: string
  whatsapp: string
  twitter: string
  linkedin: string
  telegram: string
  facebook: string
  skype: string
}

export interface ShareConfig {
  copy?: boolean
  print?: boolean
  email?: boolean
  sms?: boolean
  messenger?: boolean
  facebook?: boolean
  whatsapp?: boolean
  twitter?: boolean
  linkedin?: boolean
  telegram?: boolean
  skype?: boolean
  language?: ShareLanguage
}

export type Lang =
  | 'cs'
  | 'sk'
  | 'ja'
  | 'zh'
  | 'pt'
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'nl'
  | 'sv'
  | 'da'
  // Deprecated, use `da` instead.
  | 'dk'
  | 'ru'
  | 'tr'
  | 'ko'
  | 'ta'
  | 'pl'

export type ShareLanguage = Record<Lang, ShareOption>
export type ShareTool =
  | 'copy'
  | 'print'
  | 'email'
  | 'sms'
  | 'messenger'
  | 'facebook'
  | 'whatsapp'
  | 'twitter'
  | 'telegram'
  | 'signal'
  | 'linkedin'
  | 'selectSms'
  | 'shareTitle'

export type ValueOf<T> = T[keyof T]
