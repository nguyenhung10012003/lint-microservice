import { PROFILE_PACKAGE_NAME } from '@app/common/types/profile';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROFILE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PROFILE_PACKAGE_NAME,
          protoPath: join(__dirname, '../user/profile.proto'),
        },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
