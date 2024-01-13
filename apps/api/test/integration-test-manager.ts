import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from 'src/app.module';
import { DataSource, EntityManager } from 'typeorm';
import { UserEntity } from 'src/modules/auth/infra/database';
import { UserFixture } from './fixtures';

export class IntegrationTestManager {
  public httpServer: any;

  private app: INestApplication;
  private accessToken: string;
  private dataSource: DataSource;
  private module: TestingModule;

  async beforeAll(): Promise<void> {
    this.module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = this.module.createNestApplication();
    await this.app.init();
    this.httpServer = this.app.getHttpServer();
    this.dataSource = this.module.get<DataSource>(DataSource);
  }

  get userRepository() {
    return this.dataSource.getRepository(UserEntity);
  }

  async beforeEach() {
    await this.dataSource.synchronize(true);
    await this.dataSource
      .getRepository(UserEntity)
      .save(await UserFixture.default);

    // const authService = this.app.get<AuthService>(AuthService);

    // this.accessToken = await authService.login({
    //   ...testUser,
    //   _id: userId._id.toHexString(),
    // });
  }

  async afterAll() {
    await this.app.close();
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getApp() {
    return this.app;
  }
}
