import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ProfileModule, AuthModule, CommonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcToHttpInterceptor,
    },
    
  ],
})
export class AppModule {}
