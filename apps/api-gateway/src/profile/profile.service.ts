import {
  PROFILE_SERVICE_NAME,
  ProfileDto,
  ProfileServiceClient,
} from '@app/common/types/profile';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';

@Injectable()
export class ProfileService implements OnModuleInit {
  private profilServiceClient: ProfileServiceClient;
  constructor(@Inject(MicroService.USER_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.profilServiceClient =
      this.client.getService<ProfileServiceClient>(PROFILE_SERVICE_NAME);
  }
  async create(createProfileDto: ProfileDto) {
    return this.profilServiceClient.create(createProfileDto);
  }

  async findAll() {
    return this.profilServiceClient.findAll({});
  }

  async findOne(id: string) {
    return this.profilServiceClient.findById({ id });
  }

  async update(id: string, updateProfileDto: ProfileDto) {
    return this.profilServiceClient.update(updateProfileDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
