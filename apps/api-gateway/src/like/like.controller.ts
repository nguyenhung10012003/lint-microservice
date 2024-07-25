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
import { CountQuery, ManyQuery } from '../types/query';
import { LikeQuery } from './like.query';
import { LikeService } from './like.service';

@Controller('like')
@UseGuards(AccessTokenGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @Post()
  create(@Req() req: any) {
    return this.likeService.create({
      userId: req.user.userId,
      postId: req.body.postId,
    });
  }

  @Delete()
  delete(@Req() req: any) {
    return this.likeService.delete({
      userId: req.user.userId,
      id: req.body.id,
      postId: req.body.postId,
    });
  }

  @Get()
  find(@Query() query: ManyQuery) {
    const params = new LikeQuery(
      query.select,
      query.take,
      query.skip,
      query.postId + '',
    );
    return this.likeService.find(params.extract());
  }

  @Get('count')
  count(@Query() query: CountQuery) {
    return this.likeService.count({
      postId: query.postId + '',
    });
  }

  @Get('exist')
  exists(@Req() req: any, @Query() query: { userId: string; postId: string }) {
    return this.likeService.exists({
      userId: req.user.userId,
      postId: query.postId,
    });
  }
}
