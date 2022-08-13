import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosService } from './todos/todos.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, TodosService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to todos!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Welcome to todos!' });
    });
  });

  describe('getAppData', () => {
    it('getTodos, returns a list of elements', () => {
      const appController = app.get<AppController>(AppController);
      expect(Array.isArray(appController.getAppData())).toBe(true)
    });
  });
});
