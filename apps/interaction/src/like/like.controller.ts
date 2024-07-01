import {
  Like,
  LikeDto,
  LikeId,
  LikeParams,
  LikeServiceController,
  LikeServiceControllerMethods,
  Likes,
} from '@app/common/types/like';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LikeService } from './like.service';

@Controller()
@LikeServiceControllerMethods()
export class LikeController implements LikeServiceController {
  constructor(private readonly likeService: LikeService) {}
  create(request: LikeDto): Like | Promise<Like> | Observable<Like> {
    throw new Error('Method not implemented.');
  }
  delete(request: LikeId): Like | Promise<Like> | Observable<Like> {
    throw new Error('Method not implemented.');
  }
  find(request: LikeParams): Likes | Promise<Likes> | Observable<Likes> {
    throw new Error('Method not implemented.');
  }
}
