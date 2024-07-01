import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [CommonModule],
  controllers: [MediaController],
  providers: [MediaService, PrismaService],
  exports: [MediaService],
})
export class MediaModule {}
