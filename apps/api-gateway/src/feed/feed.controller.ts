import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { FeedService } from './feed.service';

@Controller('feed')
@UseGuards(AccessTokenGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeed(
    @Req() req: any,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.feedService.getFeed(req.user.userId, skip, take);
  }
}
