import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { TagService } from './tag.service';

@Controller('tag')
@UseGuards(AccessTokenGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags(@Query() q: { skip?: number; take?: number; search?: string }) {
    return this.tagService.findMany({
      skip: q.skip,
      take: q.take,
      where: {
        name: {
          contains: q.search,
        },
      },
    });
  }

  @Get(':id')
  getTag(@Query('id') id: string) {
    return this.tagService.findOne({ id: +id });
  }

  @Post()
  createTag(@Body() tag: { name: string }) {
    return this.tagService.create(tag);
  }
}
