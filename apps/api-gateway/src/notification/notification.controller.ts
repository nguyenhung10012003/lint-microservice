// import {
//   Body,
//   Controller,
//   Patch,
//   Query,
//   UseGuards,
//   Get,
//   Request,
//   Delete,
//   Post,
// } from '@nestjs/common';
// import { NotificationService } from './notification.service';
// import {
//   CreateNotificationDto,
//   NotificationWhereUnique,
//   UpdateNotificationDto,
// } from '@app/common/types/notification';
// import { ManyQuery } from '../types/query';
// import { AccessTokenGuard } from '../lib/guards/access-token.guard';

// @Controller('notifications')
// @UseGuards(AccessTokenGuard)
// export class NotificationController {
//   constructor(private notificationService: NotificationService) {}

//   @Get()
//   async findMany(@Request() request, @Query() query: ManyQuery) {
//     const userId = request.user.userId;
//     return this.notificationService.findMany({
//       where: {
//         userId: userId,
//       },
//       skip: query.skip,
//       take: query.take,
//       orderBy: query.orderBy as string,
//     });
//   }

//   @Post()
//   async create(@Body() createDto: CreateNotificationDto) {
//     return await this.notificationService.create(createDto);
//   }

//   @Patch()
//   async update(@Request() request, @Body() updateDto: UpdateNotificationDto) {
//     const userId = request.user.userId;
//     return await this.notificationService.update(updateDto, userId);
//   }

//   @Delete()
//   async delete(@Request() request, @Body() where: NotificationWhereUnique) {
//     const userId = request.user.userId;
//     await this.notificationService.delete(where, userId);
//   }
// }
