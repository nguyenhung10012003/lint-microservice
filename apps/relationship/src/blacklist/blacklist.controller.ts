import { ErrorInterceptor } from '@app/common/interceptors/error.interceptor';
import {
  Blacklist,
  BlacklistDto,
  BlacklistServiceController,
  BlacklistServiceControllerMethods,
  BlacklistWhereUnique,
} from '@app/common/types/blacklist';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlacklistService } from './blacklist.service';

@Controller()
@BlacklistServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class BlacklistController implements BlacklistServiceController {
  constructor(private readonly blacklistService: BlacklistService) {}
  update(
    request: BlacklistDto,
  ): Blacklist | Promise<Blacklist> | Observable<Blacklist> {
    return this.blacklistService.update({
      data: request,
      where: { userId: request.userId },
    });
  }
  findOne(
    request: BlacklistWhereUnique,
  ): Blacklist | Promise<Blacklist> | Observable<Blacklist> {
    return this.blacklistService.findOne({
      where: request,
    });
  }
}
