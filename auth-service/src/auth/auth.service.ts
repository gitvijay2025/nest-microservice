// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}


import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(data: any) {

    const { email, password } = data;

    // fake validation
    if (
      email !== 'admin@test.com' ||
      password !== '123456'
    ) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      sub: 1,
      email,
      role: 'admin',
    };

    return {
      access_token:
        this.jwtService.sign(payload),
    };
  }
}