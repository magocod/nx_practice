import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { TodosService } from './todos/todos.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private todosService: TodosService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('app')
  getAppData() {
    return this.todosService.getTodos();
  }
}
