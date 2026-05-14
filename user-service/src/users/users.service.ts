import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {
    return [
      {
        id: 1,
        name: 'Vijay',
      },
      {
        id: 2,
        name: 'Rahul',
      },
    ];
  }
}
