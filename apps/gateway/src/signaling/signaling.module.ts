import { Module } from '@nestjs/common'
import { AppLogger } from '../app.logger'
import { SignalingGateway } from './signaling.gateway'

@Module({
  providers: [AppLogger, SignalingGateway],
})
export class SignalingModule {}
