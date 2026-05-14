import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { USER_SERVICE } from './users.constants';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_SERVICE,
          useValue: {
            send: jest.fn(() => of([])),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
