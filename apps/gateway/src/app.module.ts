import { Module } from '@nestjs/common';
import { SignalingModule } from './signaling/signaling.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SignalingModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
