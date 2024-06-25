import { Profile, User } from '@prisma/prisma-user-client';

export class UserModel implements User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  profile?: Profile;
}
