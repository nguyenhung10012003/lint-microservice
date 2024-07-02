import { ErrorInterceptor } from '@app/common/interceptors/error.interceptor';
import { Count } from '@app/common/types/count';
import {
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
  create(request: LikeDto): Like | Promise<Like> | Observable<Like> {
    return this.likeService.create(request);
  }
  delete(request: LikeWhereUnique): Like | Promise<Like> | Observable<Like> {
    return this.likeService.delete(request);
  }
  find(request: LikeParams): Likes | Promise<Likes> | Observable<Likes> {
    return this.likeService.find(request);
  }
  count(request: LikeWhere): Count | Promise<Count> | Observable<Count> {
    return this.likeService.count(request);
  }
}
