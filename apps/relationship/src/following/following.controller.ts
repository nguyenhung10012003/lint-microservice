import { ErrorInterceptor } from '@app/common/interceptors/error.interceptor';
import {
  Count,
  Follow,
  FollowDto,
  FollowWhere,
  FollowWhereUnique,
  FollowingServiceController,
  FollowingServiceControllerMethods,
  Follows,
} from '@app/common/types/following';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FollowingService } from './following.service';

@Controller()
@FollowingServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class FollowingController implements FollowingServiceController {
  constructor(private readonly followingService: FollowingService) {}
  create(request: FollowDto): Follow | Promise<Follow> | Observable<Follow> {
    return this.followingService.create(request);
  }
  delete(
    request: FollowWhereUnique,
  ): Follow | Promise<Follow> | Observable<Follow> {
    return this.followingService.delete(request);
  }
  find(request: FollowWhere): Follows | Promise<Follows> | Observable<Follows> {
    return this.followingService.find(request);
  }
  count(request: FollowWhere): Count | Promise<Count> | Observable<Count> {
    return this.followingService.count(request);
  }
}
