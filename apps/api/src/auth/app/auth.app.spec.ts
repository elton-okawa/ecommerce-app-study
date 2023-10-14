import { Test, TestingModule } from '@nestjs/testing';
import { AuthApp } from './auth.app';

describe('AuthService', () => {
  let service: AuthApp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthApp],
    }).compile();

    service = module.get<AuthApp>(AuthApp);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
