import { Empty } from '@app/common/types/empty';
import {
  Id,
  ProfileDto,
  ProfileMessage,
  ProfileServiceController,
  ProfileServiceControllerMethods,
  ProfilesMessage,
  ResponseProfile,
  UserIdDto,
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
  findByUserId(
    request: Id,
  ): Promise<ProfileMessage> | Observable<ProfileMessage> | ProfileMessage {
    return this.profileService.findByUserId(request.id);
  }

  findAll(
    request: Empty,
  ): ProfilesMessage | Promise<ProfilesMessage> | Observable<ProfilesMessage> {
    return this.profileService.findAll(request);
  }

  findById(
    request: Id,
  ): ProfileMessage | Promise<ProfileMessage> | Observable<ProfileMessage> {
    return this.profileService.findById(request.id);
  }

  findOne(
    request: UserIdDto,
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
  delete(request: Id): Empty | Promise<Empty> | Observable<Empty> {
    return null;
  }
}
