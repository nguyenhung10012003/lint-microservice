import {
  AuthServiceController,
  AuthServiceControllerMethods,
  RefreshTokenRequest,
  SigninRequest,
  Token,
} from '@app/common/types/auth';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ErrorInterceptor } from './interceptor/error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  signin(request: SigninRequest): Token | Observable<Token> | Promise<Token> {
    return this.authService.validateUser(request.email, request.password);
  }
  refreshToken(
    request: RefreshTokenRequest,
  ): Token | Observable<Token> | Promise<Token> {
    return this.authService.validateRefreshToken(request.refreshToken);
  }
}
