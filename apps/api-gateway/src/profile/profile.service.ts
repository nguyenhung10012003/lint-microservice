import {
  PROFILE_PACKAGE_NAME,
  PROFILE_SERVICE_NAME,
  ProfileDto,
  ProfileServiceClient,
} from '@app/common/types/profile';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ProfileService implements OnModuleInit {
  private profilServiceClient: ProfileServiceClient;
  constructor(@Inject(PROFILE_PACKAGE_NAME) private client: ClientGrpc) {}
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

  async findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: string, updateProfileDto: ProfileDto) {
    return this.profilServiceClient.update(updateProfileDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
