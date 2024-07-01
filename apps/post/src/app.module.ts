import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';

@Module({
  imports: [CommonModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
