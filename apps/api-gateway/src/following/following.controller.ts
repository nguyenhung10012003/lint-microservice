import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { FollowingService } from './following.service';

@Controller('following')
@UseGuards(AccessTokenGuard)
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @Post()
  async follow(@Req() req: any) {
    return this.followingService.create({
      followerId: req.user.userId,
      followingId: req.body.followingId,
    });
  }

  @Delete()
  async unfollow(@Req() req: any) {
    return this.followingService.delete(
      req.body.id,
      req.body.followerId,
      req.body.followingId,
    );
  }

  @Get()
  async find(
    @Query()
    query: {
      followerId: string;
      followingId: string;
      skip?: number;
      take?: number;
    },
  ) {
    return this.followingService.find(query);
  }

  @Get('/count')
  async count(
    @Query()
    query: {
      followerId: string;
      followingId: string;
    },
  ) {
    return this.followingService.count(query);
  }
}
