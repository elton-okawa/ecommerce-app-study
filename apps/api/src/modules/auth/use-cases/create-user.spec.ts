import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from './create-user';
import { IUserRepository } from '../repositories';
import { User } from '../domain';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('Create User - Unit Test', () => {
  let createUser: CreateUser;
  let userRepository: DeepMocked<IUserRepository>;

  const username = 'user';
  const password = 'password';

  beforeEach(async () => {
    userRepository = createMock<IUserRepository>();
    const test: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUser,
        {
          provide: IUserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    createUser = test.get(CreateUser);
  });

  it('should create user correctly', async () => {
    userRepository.findByUsername.mockResolvedValueOnce(null);

    const res = await createUser.execute({ username, password });
    expect(res.succeeded).toBe(true);
    expect(userRepository.save).toBeCalled();
  });

  it('should fail if username already exists', async () => {
    userRepository.findByUsername.mockResolvedValueOnce(
      User.create(username, password),
    );

    const res = await createUser.execute({ username, password });
    expect(res.succeeded).toBe(false);
    expect(userRepository.save).not.toBeCalled();
  });
});
