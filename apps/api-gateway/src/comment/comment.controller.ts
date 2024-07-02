import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { CountQuery, ManyQuery } from '../types/query';
import { CommentService } from './comment.service';
import { CommentQuery } from './model/comment.query';

@Controller('comment')
@UseGuards(AccessTokenGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Req() req: any) {
    return this.commentService.create({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.user.userId,
    });
  }

  @Get()
  find(@Query() query: ManyQuery) {
    const params = new CommentQuery(query.select, query.skip, query.take);
    return this.commentService.find(params.extract());
  }

  @Get('count')
  count(@Query() query: CountQuery) {
    return this.commentService.count({
      postId: query.postId + '',
    });
  }

  @Delete()
  delete(@Req() req: any) {
    return this.commentService.delete({
      id: req.body.id,
      postId: req.body.postId,
      userId: req.user.userId,
    });
  }

  @Patch()
  update(@Req() req: any) {
    return this.commentService.update({
      id: req.body.id,
      postId: req.body.postId,
      userId: req.user.userId,
      content: req.body.content,
    });
  }
}
