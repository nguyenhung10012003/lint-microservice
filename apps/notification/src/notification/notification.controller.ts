import {
  NotificationServiceController,
  NotificationServiceControllerMethods,
  Notifications,
  NotificationFindParams,
  Empty,
  UpdateStatusDto,
  NotificationWhereUnique,
} from '@app/common/types/notification';
import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  findMany(
    data: NotificationFindParams,
  ): Notifications | Promise<Notifications> | Observable<Notifications> {
    return this.notificationService.findMany(data);
  }

  updateStatus(
    data: UpdateStatusDto,
  ): Empty | Promise<Empty> | Observable<Empty> {
    return this.notificationService.updateStatus(data);
  }

  delete(
    data: NotificationWhereUnique,
  ): Empty | Promise<Empty> | Observable<Empty> {
    return this.notificationService.delete(data);
  }
}
