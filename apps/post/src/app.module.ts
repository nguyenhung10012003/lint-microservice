import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [CommonModule, PostModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
