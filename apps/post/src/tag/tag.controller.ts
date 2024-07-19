import { ErrorInterceptor } from '@app/common/interceptors/error.interceptor';
import {
  Tag,
  TagDto,
  TagFindParams,
  Tags,
  TagServiceController,
  TagServiceControllerMethods,
  TagWhereUnique,
} from '@app/common/types/tag';
import { convertOrderByObject } from '@app/common/utils/order-by-query';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TagService } from './tag.service';

@Controller()
@TagServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class TagController implements TagServiceController {
  constructor(private readonly tagService: TagService) {}

  create(request: TagDto) {
    return this.tagService.create(request);
  }
  update(request: TagDto): Promise<Tag> | Observable<Tag> | Tag {
    throw new Error('Method not implemented.');
  }
  find(request: TagFindParams): Tags | Promise<Tags> | Observable<Tags> {
    return this.tagService.findMany({
      ...request,
      orderBy: convertOrderByObject(request.orderBy),
    });
  }
  findOne(request: TagWhereUnique): Tag | Promise<Tag> | Observable<Tag> {
    return this.tagService.findOne(request);
  }
  delete(request: TagWhereUnique): Tag | Promise<Tag> | Observable<Tag> {
    throw new Error('Method not implemented.');
  }
}
