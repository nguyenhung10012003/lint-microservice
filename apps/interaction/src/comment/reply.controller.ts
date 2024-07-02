import { ErrorInterceptor } from '@app/common/interceptors/error.interceptor';
import {
  Replies,
  Reply,
  ReplyDto,
  ReplyParams,
  ReplyServiceController,
  ReplyServiceControllerMethods,
  ReplyUpdateDto,
  ReplyWhereUnique,
} from '@app/common/types/comment';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ReplyService } from './reply.service';

@Controller()
@ReplyServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class ReplyController implements ReplyServiceController {
  constructor(private readonly replyService: ReplyService) {}
  create(request: ReplyDto): Reply | Promise<Reply> | Observable<Reply> {
    return this.replyService.create(request);
  }
  delete(
    request: ReplyWhereUnique,
  ): Reply | Promise<Reply> | Observable<Reply> {
    return this.replyService.delete(request);
  }
  find(request: ReplyParams): Replies | Promise<Replies> | Observable<Replies> {
    return this.replyService.find(request);
  }
  findOne(
    request: ReplyWhereUnique,
  ): Reply | Promise<Reply> | Observable<Reply> {
    return this.replyService.findOne(request);
  }
  update(request: ReplyUpdateDto): Reply | Promise<Reply> | Observable<Reply> {
    return this.replyService.update(
      { id: request.id, userId: request.userId },
      { content: request.content },
    );
  }
}
