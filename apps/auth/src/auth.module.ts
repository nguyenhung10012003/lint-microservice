import { CommonModule } from '@app/common';
import { grpcProvider } from '@app/common/providers/grpc.provider';
import { USER_PACKAGE_NAME } from '@app/common/types/user';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const grpcClient = ClientsModule.register([
  {
    name: USER_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
      url: process.env.USER_URL,
      package: USER_PACKAGE_NAME,
      protoPath: join(__dirname, '../../user/user.proto'),
    },
  },
]);

@Module({
  imports: [grpcClient, JwtModule.register({}), CommonModule],
  controllers: [AuthController],
  providers: [AuthService, grpcProvider],
})
export class AuthModule {}
