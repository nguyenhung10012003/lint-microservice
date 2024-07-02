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
import { ManyQuery } from '../types/query';
import { ReplyQuery } from './model/reply.query';
import { ReplyService } from './reply.service';

@Controller('reply')
@UseGuards(AccessTokenGuard)
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  create(@Req() req: any) {
    return this.replyService.create({
      content: req.body.content,
      commentId: req.body.commentId,
      userId: req.user.userId,
    });
  }

  @Get()
  find(@Query() query: ManyQuery) {
    const params = new ReplyQuery(query.select, query.skip, query.take, {
      commentId: query.commentId?.toString(),
    });
    return this.replyService.find(params.extract());
  }

  @Patch()
  update(@Req() req: any) {
    return this.replyService.update({
      id: req.body.id,
      userId: req.user.userId,
      content: req.body.content,
    });
  }

  @Delete()
  delete(@Req() req: any) {
    return this.replyService.delete({
      id: req.body.id,
      userId: req.user.userId,
    });
  }
}
