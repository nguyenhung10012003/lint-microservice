import { Profile } from '@prisma/prisma-user-client';

export class ProfileModel implements Profile {
  id: string;
  userId: string;
  name: string | null;
  dob: Date | null;
  country: string | null;
  gender: string | null;
  avatar: string | null;
  alias: string | null;
  bio: string | null;

}
