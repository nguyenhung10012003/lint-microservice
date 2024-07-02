import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { FollowingModule } from './following/following.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    AuthModule,
    CommonModule,
    FollowingModule,
    BlacklistModule,
    PostModule,
    LikeModule,
    CommentModule,
  ],
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
