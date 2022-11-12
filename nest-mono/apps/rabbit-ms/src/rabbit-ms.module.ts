import { Module } from '@nestjs/common';
import { RabbitMsController } from './rabbit-ms.controller';

@Module({
  imports: [],
  controllers: [RabbitMsController],
  providers: [],
})
export class RabbitMsModule {}
