import { SignalingModule } from './signaling/signaling.module'
import { AuthModule } from './auth/auth.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [SignalingModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
