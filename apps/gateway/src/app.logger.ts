import { environment } from './environments/environment'
import { LoggerService, ConsoleLogger } from '@nestjs/common'

export class AppLogger extends ConsoleLogger implements LoggerService {
  context: string

  setContext(context: string) {
    this.context = context
  }

  log(message: any, context?: string) {
    super.log(message, context ? context : this.context)
  }
  error(message: any, trace?: string, context?: string) {
    super.error(message, context ? context : this.context)
  }
  warn(message: any, context?: string) {
    super.warn(message, context ? context : this.context)
  }
  debug(message: any, context?: string) {
    if (!environment.production) {
      super.debug(message, context ? context : this.context)
    }
  }
  verbose(message: any, context?: string) {
    super.verbose(message, context ? context : this.context)
  }
}
