import { Empty } from '@app/common/types/empty';
import {
  ProfileDto,
  ProfileId,
  ProfileMessage,
  ProfileServiceController,
  ProfileServiceControllerMethods,
  ProfilesMessage,
  ResponseProfile,
  UserId,
} from '@app/common/types/profile';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import ProfileBuilder from './model/profile.builder';
import { ProfileService } from './profile.service';

@Controller()
@ProfileServiceControllerMethods()
@UseInterceptors(ErrorInterceptor)
export class ProfileController implements ProfileServiceController {
  constructor(private readonly profileService: ProfileService) {}

  findAll(
    request: Empty,
  ): ProfilesMessage | Promise<ProfilesMessage> | Observable<ProfilesMessage> {
    return this.profileService.findAll(request);
  }

  findById(
    request: ProfileId,
  ): ProfileMessage | Promise<ProfileMessage> | Observable<ProfileMessage> {
    return this.profileService.findById(request.id);
  }

  findOne(
    request: UserId,
  ): ResponseProfile | Promise<ResponseProfile> | Observable<ResponseProfile> {
    return this.profileService.findOne(request.userId);
  }
  create(
    request: ProfileDto,
  ): ProfileMessage | Promise<ProfileMessage> | Observable<ProfileMessage> {
    return this.profileService.create(
      new ProfileBuilder(request.userId)
        .withName(request.name)
        .withAlias(request.alias)
        .withAvatar(request.avatar)
        .withBio(request.bio)
        .withCountry(request.country)
        .withDob(new Date(request.dob))
        .withGender(request.gender)
        .build(),
    );
  }

  update(
    request: ProfileDto,
  ): ProfileMessage | Promise<ProfileMessage> | Observable<ProfileMessage> {
    return this.profileService.update({
      where: {
        userId: request.userId,
      },
      data: {
        ...request,
        dob: request.dob && new Date(request.dob),
      },
    });
  }

  delete(request: ProfileId): Empty | Promise<Empty> | Observable<Empty> {
    return null;
  }
}
