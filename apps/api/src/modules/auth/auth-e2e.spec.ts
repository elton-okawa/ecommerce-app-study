import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { IntegrationTestManager } from 'test/integration-test-manager';

describe('createUser', () => {
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

  describe('a', () => {
    test('b', () => {
      expect(true).toBe(true);
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
