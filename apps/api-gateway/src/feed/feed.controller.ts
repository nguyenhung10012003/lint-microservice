import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { FeedService } from './feed.service';
import { FeedQuery } from './model/feed.query';

@Controller('feed')
@UseGuards(AccessTokenGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeed(
    @Req() req: any,
    @Query()
    query: FeedQuery,
  ) {
    const feedQuery = new FeedQuery(query);
    return this.feedService.getFeed({
      ...feedQuery.extract(),
      userId: req.user.userId,
    });
  }
}
