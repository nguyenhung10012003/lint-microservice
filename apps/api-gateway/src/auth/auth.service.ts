import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common/types/auth';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/common/types/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { MicroService } from '../grpc-client/microservice';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClient;
  private userClient: UserServiceClient;
  constructor(
    @Inject(MicroService.AUTH_SERVICE) private readonly clientAuth: ClientGrpc,
    @Inject(MicroService.USER_SERVICE) private readonly clientUser: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {}
  onModuleInit() {
    this.authClient =
      this.clientAuth.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    this.userClient =
      this.clientUser.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async signup(data: { email: string; password: string }) {
    const request = {
      email: data.email,
      password: data.password,
    };
    await lastValueFrom(this.userClient.create(request));
    return this.signin(data);
  }

  async signin(data: { email: string; password: string }) {
    return this.authClient.signin(data);
  }

  async refreshToken(data: { refreshToken: string }) {
    return this.authClient.refreshToken(data);
  }
}
