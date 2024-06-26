import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { AccessTokenStrategy } from '../lib/strategies/access-token.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [GrpcClientModule],
  controllers: [UserController],
  providers: [UserService, AccessTokenStrategy],
})
export class UserModule {}
