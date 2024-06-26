import { Module } from '@nestjs/common';
import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';
import { PROFILE_PACKAGE_NAME } from '@app/common/types/profile';
import { USER_PACKAGE_NAME } from '@app/common/types/user';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [],
  providers: [],
})
export class TestModule {}
