import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { AccessTokenGuard } from '../lib/guards/access-token.guard';
import { UserQuery } from './model/user.query';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(
    @Query()
    query: UserQuery,
  ) {
    const userQuery = new UserQuery({
      select: query.select,
      skip: query.skip,
      take: query.take,
      ids: query.ids,
    });
    return this.userService.findAll(userQuery.extract());
  }

  @Get('search')
  search(@Query() query: { key: string; skip: number; take: number }) {
    return this.userService.search(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() data: { email: string; password: string }) {
    return this.userService.create(data);
  }
}
