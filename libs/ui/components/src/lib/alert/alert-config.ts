export type AlertType = 'info' | 'warn' | 'error'

export interface AlertConfig {
  type: AlertType
  header: string
  body: string
}
