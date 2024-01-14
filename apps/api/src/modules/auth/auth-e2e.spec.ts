import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { IntegrationTestManager } from 'test/integration-test-manager';
import { Token } from './interfaces/graphql/objects/token.object';
import { UserFixture } from 'test/fixtures';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode } from 'src/interfaces/graphql';
import { loadGraphQLString } from 'test/helpers';

const signupMutation = loadGraphQLString('auth', 'signup');
const loginMutation = loadGraphQLString('auth', 'login');

describe('Auth - e2e tests', () => {
  const manager = new IntegrationTestManager();

  beforeAll(async () => {
    await manager.beforeAll();
  });

  beforeEach(async () => {
    await manager.beforeEach();
  });

  afterAll(async () => {
    await manager.afterAll();
  });

  describe('login mutation', () => {
    test('should login and return token with payload correctly', async () => {
      const jwtService = manager.getApp().get<JwtService>(JwtService);
      const fixture = await UserFixture.default;
      const response = await request<{ login: Token }>(manager.httpServer)
        .mutate(loginMutation)
        .variables({
          loginInput: {
            username: fixture.username,
            password: 'password',
          },
        })
        .expectNoErrors();

      expect(response.data.login).toStrictEqual({
        accessToken: expect.any(String),
      });

      const payload = jwtService.decode(response.data.login.accessToken);
      expect(payload).toStrictEqual({
        exp: expect.any(Number),
        iat: expect.any(Number),
        sub: fixture.username,
        username: fixture.username,
      });
      const nowSeconds = Date.now() / 1000;
      expect(payload['exp']).toBeWithin(nowSeconds, nowSeconds + 61);
    });

    test.each([
      { username: 'username', password: 'abc', message: 'password' },
      { username: 'abc', password: 'password', message: 'username' },
    ])(
      'should return error because "$message" is invalid',
      async ({ username, password }) => {
        const { errors } = await request<{ login: Token }>(manager.httpServer)
          .mutate(loginMutation)
          .variables({
            loginInput: {
              username: username,
              password: password,
            },
          });

        expect(errors).toHaveLength(1);
        expect(errors[0].extensions.code).toEqual(ErrorCode.BUSINESS_ERROR);
      },
    );
  });

  describe('signup mutation', () => {
    test('should create user correctly', async () => {
      const input = { username: 'super-user', password: 'super-password' };
      const response = await request(manager.httpServer)
        .mutate(signupMutation)
        .variables({
          input,
        })
        .expectNoErrors();

      // TODO check returned user
      const savedUser = await manager.userRepository.findOne({
        where: { username: input.username },
      });
      expect(savedUser).toMatchObject({ username: input.username });
      expect(await savedUser.password.toString()).not.toEqual(input.password);
    });

    test('should throw error if "username" is already taken', async () => {
      const input = { username: 'username', password: 'super-password' };
      const { errors } = await request(manager.httpServer)
        .mutate(signupMutation)
        .variables({
          input,
        });

      expect(errors).toHaveLength(1);
      expect(errors[0].extensions.code).toEqual(ErrorCode.BUSINESS_ERROR);
    });
  });

  describe('production flow', () => {
    test('create account and login successfully', async () => {
      const input = { username: 'super-user', password: 'super-password' };
      await request(manager.httpServer)
        .mutate(signupMutation)
        .variables({
          input,
        })
        .expectNoErrors();

      await request<{ login: Token }>(manager.httpServer)
        .mutate(loginMutation)
        .variables({
          loginInput: input,
        })
        .expectNoErrors();
    });
  });
});
