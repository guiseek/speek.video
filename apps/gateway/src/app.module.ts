import { SignalingModule } from './signaling/signaling.module'
import { AuthModule } from './auth/auth.module'
import { Module } from '@nestjs/common'
import { AppLogger } from './app.logger'

@Module({
  imports: [SignalingModule, AuthModule],
  controllers: [],
  providers: [AppLogger],
})
export class AppModule {}
