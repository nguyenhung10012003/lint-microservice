import {
  Comment,
  CommentDto,
  CommentId,
  CommentParams,
  CommentServiceController,
  CommentServiceControllerMethods,
  CommentUpdateDto,
  CommentWhere,
  CommentWhereUnique,
  Comments,
} from '@app/common/types/comment';
import { Count } from '@app/common/types/count';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommentService } from './comment.service';

@Controller()
@CommentServiceControllerMethods()
export class CommentController implements CommentServiceController {
  constructor(private readonly commentService: CommentService) {}
  count(request: CommentWhere): Count | Promise<Count> | Observable<Count> {
    return this.commentService.count(request);
  }
  create(
    request: CommentDto,
  ): Comment | Promise<Comment> | Observable<Comment> {
    return this.commentService.create(request);
  }
  delete(request: CommentId): Comment | Promise<Comment> | Observable<Comment> {
    return this.commentService.delete(request);
  }
  find(
    request: CommentParams,
  ): Comments | Promise<Comments> | Observable<Comments> {
    return this.commentService.find(request);
  }
  findOne(
    request: CommentWhereUnique,
  ): Comment | Promise<Comment> | Observable<Comment> {
    return this.commentService.findOne(request);
  }
  update(
    request: CommentUpdateDto,
  ): Comment | Promise<Comment> | Observable<Comment> {
    return this.commentService.update(
      { id: request.id, userId: request.userId },
      { content: request.content },
    );
  }
}
