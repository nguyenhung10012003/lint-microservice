import {
  FindAllParams,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common/types/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;
  constructor(@Inject(MicroService.USER_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async findAll(query: FindAllParams) {
    return this.userService.findAll(query);
  }

  async findById(id: string) {
    return this.userService.findById({ id });
  }

  async create(data: { email: string; password: string }) {
    return this.userService.create(data);
  }
}
