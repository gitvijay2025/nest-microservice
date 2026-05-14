import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

  private readonly logger = new Logger(UsersController.name);


  constructor(private readonly usersService: UsersService) {}
  
  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    this.logger.log('Received get_users message');
    return this.usersService.getUsers();
  }




   @MessagePattern({ cmd: 'get_user_by_id' })
   getUserById(id: number) {
    this.logger.log('Received get_user_by_id message');
    return { id, name: 'Vijay' };
   }

   @MessagePattern({ cmd: 'create_user' })
   createUser() {
    this.logger.log('Received create_user message');
    return { message: 'User created successfully' };
   }

}