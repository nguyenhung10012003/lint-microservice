import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { RefreshTokenStrategy } from '../lib/strategies/refresh-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [GrpcClientModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy],
})
export class AuthModule {}
