import {
  NotificationServiceController,
  NotificationServiceControllerMethods,
  Notification,
  Notifications,
  CreateNotificationDto,
  UpdateNotificationDto,
  NotificationFindParams,
  Empty,
  NotificationWhereUnique,
} from '@app/common/types/notification';
import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  create(
    request: CreateNotificationDto,
  ): Notification | Promise<Notification> | Observable<Notification> {
    return this.notificationService.create(request);
  }

  update(
    request: UpdateNotificationDto,
  ): Promise<Notification> | Observable<Notification> | Notification {
    return this.notificationService.update(request);
  }

  findMany(
    request: NotificationFindParams,
  ): Notifications | Promise<Notifications> | Observable<Notifications> {
    return this.notificationService.findMany(request);
  }

  delete(
    request: NotificationWhereUnique,
  ): Promise<Empty> | Observable<Empty> | Empty {
    return this.notificationService.delete(request);
  }
}
