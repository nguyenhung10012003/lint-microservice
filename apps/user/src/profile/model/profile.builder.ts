import { isValidDate } from '../../utils/date';

export default class ProfileBuilder {
  private userId: string;
  private name: string | null;
  private dob: Date | null;
  private country: string | null;
  private gender: string | null;
  private avatar: string | null;
  private alias: string | null;
  private bio: string | null;

  constructor(userId: string) {
    this.userId = userId;
  }

  withName(name?: string) {
    this.name = name || null;
    return this;
  }

  withDob(dob?: Date) {
    this.dob = isValidDate(dob) ? dob : null;
    return this;
  }

  withCountry(country?: string) {
    this.country = country || null;
    return this;
  }

  withGender(gender?: string) {
    this.gender = gender || null;
    return this;
  }

  withAvatar(avatar?: string) {
    this.avatar = avatar || null;
    return this;
  }

  withAlias(alias?: string) {
    this.alias = alias || null;
    return this;
  }

  withBio(bio?: string) {
    this.bio = bio || null;
    return this;
  }

  build() {
    return {
      userId: this.userId,
      name: this.name,
      dob: this.dob,
      country: this.country,
      gender: this.gender,
      avatar: this.avatar,
      alias: this.alias,
      bio: this.bio,
    };
  }
}
