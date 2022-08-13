import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { AppService } from '../src/app/app.service';
import { TodosService } from '../src/app/todos/todos.service';

describe('Todos', () => {
  // const appService = { findAll: () => ['test'] };
  let appService: AppService;
  let todosService: TodosService;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleTesting = await Test.createTestingModule({
      providers: [AppService, TodosService],
    }).compile();
    appService = moduleTesting.get<AppService>(AppService);
    todosService = moduleTesting.get<TodosService>(TodosService);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(AppService)
      // .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication()
    app.setGlobalPrefix('/api');
    await app.init();
  });

  it(`/GET base project`, () => {
    return request(app.getHttpServer()).get('/api')
      .expect(200)
      .expect(appService.getData());
  });

  it(`/GET app service`, async () => {
    const response = await request(app.getHttpServer()).get('/api/app/');
    // console.log(response)

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual(todosService.getTodos())
  });

  afterAll(async () => {
    await app.close();
  });
});
