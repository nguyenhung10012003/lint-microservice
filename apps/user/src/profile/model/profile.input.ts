import { Prisma } from 'prisma/generated/prisma-user-client';
import { z } from 'zod';

export const ProfileCreateInput: z.ZodObject<
  {
    userId: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    dob: z.ZodNullable<z.ZodDate>;
    country: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    avatar: z.ZodNullable<z.ZodString>;
    alias: z.ZodNullable<z.ZodString>;
    bio: z.ZodNullable<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    userId: string;
    name: string | null;
    dob: Date | null;
    country: string | null;
    gender: string | null;
    avatar: string | null;
    alias: string | null;
    bio: string | null;
  },
  {
    userId: string;
    name: string | null;
    dob: Date | null;
    country: string | null;
    gender: string | null;
    avatar: string | null;
    alias: string | null;
    bio: string | null;
  }
> = z.object({
  userId: z.string(),
  name: z.string().nullable(),
  dob: z.date().nullable(),
  country: z.string().nullable(),
  gender: z.string().nullable(),
  avatar: z.string().nullable(),
  alias: z.string().nullable(),
  bio: z.string().nullable(),
}) as z.ZodObject<
  {
    userId: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    dob: z.ZodNullable<z.ZodDate>;
    country: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    avatar: z.ZodNullable<z.ZodString>;
    alias: z.ZodNullable<z.ZodString>;
    bio: z.ZodNullable<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    userId: string;
    name: string | null;
    dob: Date | null;
    country: string | null;
    gender: string | null;
    avatar: string | null;
    alias: string | null;
    bio: string | null;
  },
  {
    userId: string;
    name: string | null;
    dob: Date | null;
    country: string | null;
    gender: string | null;
    avatar: string | null;
    alias: string | null;
    bio: string | null;
  }
> satisfies z.Schema<Prisma.ProfileUncheckedCreateInput>;
