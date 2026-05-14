// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}

import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from './auth.constants';

@Injectable()
export class AuthService {

  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  login(data: any) {

    return this.authClient.send(
      { cmd: 'auth.login' },
      data,
    );
  }
}