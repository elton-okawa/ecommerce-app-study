import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateUser, JwtPayload } from './authenticate-user';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../repositories';
import { User } from '../domain';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('Authenticate User - Unit Test', () => {
  let authenticateUser: AuthenticateUser;
  let jwtService: JwtService;
  let userRepository: DeepMocked<IUserRepository>;

  const username = 'user';
  const password = 'password';

  beforeEach(async () => {
    userRepository = createMock<IUserRepository>();
    const test: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test',
        }),
      ],
      providers: [
        AuthenticateUser,
        {
          provide: IUserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    authenticateUser = test.get(AuthenticateUser);
    jwtService = test.get(JwtService);
  });

  it('should create jwt token correctly', async () => {
    userRepository.findByUsername.mockResolvedValueOnce(
      User.create(username, password),
    );

    const res = await authenticateUser.execute({ username, password });
    expect(res.succeeded).toBe(true);

    const payload = jwtService.verify<JwtPayload>(res.value.accessToken);
    expect(payload).toEqual({
      username,
      sub: username,
      iat: expect.any(Number),
    });
  });

  it('should fail if user is does not exist', async () => {
    userRepository.findByUsername.mockResolvedValueOnce(null);

    const res = await authenticateUser.execute({ username, password });
    expect(res.failed).toBe(true);
  });

  it('should fail if password is incorrect', async () => {
    userRepository.findByUsername.mockResolvedValueOnce(
      User.create(username, password),
    );

    const res = await authenticateUser.execute({ username, password: 'wrong' });
    expect(res.failed).toBe(true);
  });
});
