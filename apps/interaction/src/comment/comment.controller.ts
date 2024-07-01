import {
  Comment,
  CommentDto,
  CommentId,
  CommentParams,
  CommentServiceController,
  CommentServiceControllerMethods,
  CommentUpdateDto,
  CommentWhereUnique,
  Comments,
} from '@app/common/types/comment';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommentService } from './comment.service';

@Controller()
@CommentServiceControllerMethods()
export class CommentController implements CommentServiceController {
  constructor(private readonly commentService: CommentService) {}
  create(
    request: CommentDto,
  ): Comment | Promise<Comment> | Observable<Comment> {
    throw new Error('Method not implemented.');
  }
  delete(request: CommentId): Comment | Promise<Comment> | Observable<Comment> {
    throw new Error('Method not implemented.');
  }
  find(
    request: CommentParams,
  ): Comments | Promise<Comments> | Observable<Comments> {
    throw new Error('Method not implemented.');
  }
  findOne(
    request: CommentWhereUnique,
  ): Comment | Promise<Comment> | Observable<Comment> {
    throw new Error('Method not implemented.');
  }
  update(
    request: CommentUpdateDto,
  ): Comment | Promise<Comment> | Observable<Comment> {
    throw new Error('Method not implemented.');
  }
}
