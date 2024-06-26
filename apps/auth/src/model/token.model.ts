import { Token } from '@app/common/types/auth';

export class TokenModel implements Token {
  token: string;
  type: string;
  refreshToken: string;
  issuedAt: string;
  expireAt: string;
}
