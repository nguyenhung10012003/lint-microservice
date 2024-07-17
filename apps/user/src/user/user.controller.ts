import {
  CreateUserDto,
  FindAllParams,
  FindOneParams,
  UpdateUserDto,
  UserId,
  UserMessage,
  UserServiceController,
  UserServiceControllerMethods,
  UsersMessage,
} from '@app/common/types/user';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { UserService } from './user.service';

@Controller()
@UserServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}
  findAll(
    request: FindAllParams,
  ): UsersMessage | Promise<UsersMessage> | Observable<UsersMessage> {
    return this.userService.findAll({
      skip: request.skip,
      take: request.take,
      select: request.select,
      where: {
        id: request.where?.id,
        email: request.where?.email,
        createdAt: {
          gte: request.where?.createdAt?.gte
            ? new Date(request.where.createdAt.gte)
            : undefined,
          lte: request.where?.createdAt?.lte
            ? new Date(request.where.createdAt.lte)
            : undefined,
        },
      },
    });
  }

  findOne(
    request: FindOneParams,
  ): UserMessage | Promise<UserMessage> | Observable<UserMessage> {
    return this.userService.findOne({
      email: request.email,
      password: request.password,
      id: request.id,
    });
  }

  findById(
    request: UserId,
  ): UserMessage | Promise<UserMessage> | Observable<UserMessage> {
    return this.userService.findById(request.id, { profile: true });
  }

  create(
    request: CreateUserDto,
  ): UserMessage | Observable<UserMessage> | Promise<UserMessage> {
    return this.userService.create(request);
  }
  update(
    request: UpdateUserDto,
  ): UserMessage | Observable<UserMessage> | Promise<UserMessage> {
    return this.userService.update({
      data: request,
      where: { id: request.id },
    });
  }
  delete(
    request: UserId,
  ): UserMessage | Observable<UserMessage> | Promise<UserMessage> {
    throw new Error('Method not implemented.');
  }
}
