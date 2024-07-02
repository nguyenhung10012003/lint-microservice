import {
  Post,
  PostDto,
  PostFindParams,
  PostServiceController,
  PostServiceControllerMethods,
  PostWhereUnique,
  Posts,
} from '@app/common/types/post';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostService } from './post.service';

@Controller()
@PostServiceControllerMethods()
export class PostController implements PostServiceController {
  constructor(private readonly postService: PostService) {}
  create(request: PostDto): Post | Promise<Post> | Observable<Post> {
    return this.postService.create(request);
  }
  update(request: PostDto): Post | Promise<Post> | Observable<Post> {
    throw new Error('Method not implemented.');
  }
  find(request: PostFindParams): Posts | Promise<Posts> | Observable<Posts> {
    return this.postService.findMany(request);
  }
  findOne(request: PostWhereUnique): Post | Promise<Post> | Observable<Post> {
    throw new Error('Method not implemented.');
  }
  delete(request: PostWhereUnique): Post | Promise<Post> | Observable<Post> {
    throw new Error('Method not implemented.');
  }
}