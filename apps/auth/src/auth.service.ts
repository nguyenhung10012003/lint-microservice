import { Token } from '@app/common/types/auth';
import { USER_PACKAGE_NAME, UserServiceClient } from '@app/common/types/user';
import { comparePassword } from '@app/common/utils/hashing';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import ms from 'ms';
import {
  GrpcNotFoundException,
  GrpcUnauthenticatedException,
} from 'nestjs-grpc-exceptions';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private userClient: UserServiceClient;
  constructor(
    @Inject(USER_PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {}
  onModuleInit() {
    this.userClient = this.client.getService<UserServiceClient>('UserService');
  }

  async validateUser(email: string, password: string): Promise<Token> {
    const user = await lastValueFrom(this.userClient.findOne({ email }));
    if (!user.email) throw new GrpcNotFoundException('User not found');
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new GrpcUnauthenticatedException('Invalid password');
    const payload = { sub: user.id, username: user.email };
    return {
      userId: user.id,
      token: await this.createToken(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        process.env.JWT_ACCESS_TOKEN_EXPIRE,
      ),
      type: 'Bearer',
      refreshToken: await this.createToken(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        process.env.JWT_REFRESH_TOKEN_EXPIRE,
      ),
      issuedAt: new Date().toISOString(),
      expireAt: new Date(
        Date.now() + ms(process.env.JWT_ACCESS_TOKEN_EXPIRE),
      ).toISOString(),
    };
  }

  async createToken(
    payload: any,
    secretkey: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, { secret: secretkey, expiresIn });
  }

  async validateRefreshToken(token: string): Promise<Token> {
    const { sub, username } = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    return {
      userId: sub,
      token: await this.createToken(
        { sub, username },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        process.env.JWT_ACCESS_TOKEN_EXPIRE,
      ),
      type: 'Bearer',
      refreshToken: await this.createToken(
        { sub, username },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        process.env.JWT_REFRESH_TOKEN_EXPIRE,
      ),
      issuedAt: new Date().toISOString(),
      expireAt: new Date(
        Date.now() + ms(process.env.JWT_ACCESS_TOKEN_EXPIRE),
      ).toISOString(),
    };
  }
}
