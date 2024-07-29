import { ErrorInterceptor } from '@app/common/interceptors/error.interceptor';
import { Count } from '@app/common/types/count';
import {
  Exist,
  Like,
  LikeDto,
  LikeParams,
  LikeServiceController,
  LikeServiceControllerMethods,
  LikeWhere,
  LikeWhereUnique,
  Likes,
} from '@app/common/types/like';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LikeService } from './like.service';

@Controller()
@LikeServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class LikeController implements LikeServiceController {
  constructor(private readonly likeService: LikeService) {}
  exists(request: LikeWhere): Promise<Exist> | Observable<Exist> | Exist {
    return this.likeService.exists(request);
  }
  create(request: LikeDto): Like | Promise<Like> | Observable<Like> {
    return this.likeService.create(request);
  }
  delete(request: LikeWhereUnique): Like | Promise<Like> | Observable<Like> {
    return this.likeService.delete({
      id: request.id,
      userId_postId: {
        postId: request.postId,
        userId: request.userId,
      },
    });
  }
  find(request: LikeParams): Likes | Promise<Likes> | Observable<Likes> {
    return this.likeService.find(request);
  }
  count(request: LikeWhere): Count | Promise<Count> | Observable<Count> {
    return this.likeService.count(request);
  }
}
