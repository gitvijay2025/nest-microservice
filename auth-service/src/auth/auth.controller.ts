// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'auth.login' })

  login(data: any) {
    return this.authService.login(data);
  }
}