import { ErrorInterceptor } from '@app/common/interceptors/error.interceptor';
import {
  Post,
  PostDto,
  PostFindParams,
  PostServiceController,
  PostServiceControllerMethods,
  PostWhereUnique,
  Posts,
} from '@app/common/types/post';
import { SearchParams } from '@app/common/types/query';
import { convertOrderByObject } from '@app/common/utils/order-by-query';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostService } from './post.service';

@Controller()
@PostServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class PostController implements PostServiceController {
  constructor(private readonly postService: PostService) {}
  search(request: SearchParams): Promise<Posts> | Observable<Posts> | Posts {
    return this.postService.search(request);
  }
  create(request: PostDto) {
    return this.postService.create(request);
  }
  update(request: PostDto): Post | Promise<Post> | Observable<Post> {
    throw new Error('Method not implemented.');
  }
  find(request: PostFindParams): Posts | Promise<Posts> | Observable<Posts> {
    return this.postService.findMany({
      ...request,
      orderBy: convertOrderByObject(request.orderBy),
    });
  }
  findOne(request: PostWhereUnique): Post | Promise<Post> | Observable<Post> {
    return this.postService.findOne(request);
  }
  delete(request: PostWhereUnique): Post | Promise<Post> | Observable<Post> {
    throw new Error('Method not implemented.');
  }
}
