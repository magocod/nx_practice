import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import { AuthModule } from '@nx-nest/auth';

describe('Todos Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
      // .overrideProvider(AppService)
      // .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication()
    app.setGlobalPrefix('/api');
    await app.init();
  });

  it(`/GET auth`, async () => {
    const response = await request(app.getHttpServer()).get('/api/auth/');
    // console.log(response.body)

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      authenticated: true,
    })
  });

  afterAll(async () => {
    await app.close();
  });
});
