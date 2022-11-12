import { NestFactory } from '@nestjs/core';
import { RabbitMsModule } from './rabbit-ms.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RabbitMsModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://root:123@localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
}
bootstrap();
