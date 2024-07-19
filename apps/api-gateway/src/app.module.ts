import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { CommentModule } from './comment/comment.module';
import { FeedModule } from './feed/feed.module';
import { FollowingModule } from './following/following.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';

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
    FeedModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../local/media'),
      serveRoot: '/local/media',
    }),
    TagModule,
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
