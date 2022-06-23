import { UUID } from '@speek/util/format'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { IS_PUBLIC_KEY } from '../auth/auth.decorator'
import { SpeekPayload } from '@speek/core/entity'
import { WsException } from '@nestjs/websockets'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class SignalingGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return this.hasCode(context.switchToWs().getData())
  }

  hasCode({ code, sender }: SpeekPayload) {
    console.log(code, sender)

    if (!code || !UUID.isValid(code)) throw new WsException('Missing code.')
    return !!code
  }
}
