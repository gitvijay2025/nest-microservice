import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userClient: ClientProxy,
  ) {}

  getUsers() {
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  getUserById(id: number) {
    return this.userClient.send({ cmd: 'get_user_by_id' }, { id });
  }
}
