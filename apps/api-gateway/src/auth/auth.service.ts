import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from '@app/common/types/auth';
import {
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/common/types/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClient;
  private userClient: UserServiceClient;
  constructor(
    @Inject(AUTH_PACKAGE_NAME) private readonly clientAuth: ClientGrpc,
    @Inject(USER_PACKAGE_NAME) private readonly clientUser: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {}
  onModuleInit() {
    this.authClient =
      this.clientAuth.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    this.userClient =
      this.clientUser.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async signup(data: { email: string; password: string }) {
    return this.userClient.create(data);
  }

  async signin(data: { email: string; password: string }) {
    return this.authClient.signin(data);
  }

  async refreshToken(data: { refreshToken: string }) {
    return this.authClient.refreshToken(data);
  }
}
