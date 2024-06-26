import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() data: { email: string; password: string }) {
    return this.authService.signin(data);
  }

  @Post('signup')
  signup(@Body() data: { email: string; password: string }) {
    return this.authService.signup(data);
  }

  @Post('refresh-token')
  refreshToken(@Body() data: { refreshToken: string }) {
    return this.authService.refreshToken(data);
  }
}
