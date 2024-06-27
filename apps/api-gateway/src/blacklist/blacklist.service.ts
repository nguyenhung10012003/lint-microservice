import {
  BLACKLIST_SERVICE_NAME,
  BlacklistServiceClient,
} from '@app/common/types/blacklist';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class BlacklistService implements OnModuleInit {
  private blacklistClient: BlacklistServiceClient;
  constructor(
    @Inject(MicroService.RELATIONSHIP_SERVICE)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.blacklistClient = this.client.getService<BlacklistServiceClient>(
      BLACKLIST_SERVICE_NAME,
    );
  }

  async update(params: { userId: string; list: string[] }) {
    return this.blacklistClient.update({
      userId: params.userId,
      list: params.list.map((id) => ({ id })),
    });
  }

  async findOne(params: { userId: string }) {
    return this.blacklistClient.findOne({
      userId: params.userId,
    });
  }
}
