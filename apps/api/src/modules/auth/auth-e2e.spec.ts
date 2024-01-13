import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { IntegrationTestManager } from 'test/integration-test-manager';
import { Token } from './interfaces/graphql/objects/token.object';
import { UserFixture } from 'test/fixtures';
import { JwtService } from '@nestjs/jwt';

describe('Auth - e2e tests', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  beforeEach(async () => {
    await integrationTestManager.beforeEach();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('login mutation', () => {
    test('should login and return token with payload correctly', async () => {
      const jwtService = integrationTestManager
        .getApp()
        .get<JwtService>(JwtService);
      const fixture = await UserFixture.default;
      const response = await request<{ login: Token }>(
        integrationTestManager.httpServer,
      )
        .mutate(
          gql`
            mutation Login($loginInput: LoginInput!) {
              login(loginInput: $loginInput) {
                accessToken
              }
            }
          `,
        )
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
  });

  //   describe('given that the user does not already exist', () => {
  //     describe('when a createUser mutation is executed', () => {
  //       let createdUser: User;

  //       beforeAll(async () => {
  //         const response = await request<{ createUser: User }>(
  //           integrationTestManager.httpServer,
  //         )
  //           .mutate(
  //             gql`
  //               mutation CreateUser($createUserData: CreateUserInput!) {
  //                 createUser(createUserData: $createUserData) {
  //                   email
  //                 }
  //               }
  //             `,
  //           )
  //           .variables({
  //             createUserData: {
  //               email: userStub.email,
  //               password: 'example',
  //             },
  //           })
  //           .expectNoErrors();
  //         createdUser = response.data.createUser;
  //       });

  //       test('then the response should be the newly created user', () => {
  //         expect(createdUser).toMatchObject({
  //           email: userStub.email,
  //         });
  //       });

  //       test('then the new user should be created', async () => {
  //         const user = await integrationTestManager
  //           .getCollection('users')
  //           .findOne({ email: userStub.email });
  //         expect(user).toBeDefined();
  //       });
  //     });
  //   });
});
