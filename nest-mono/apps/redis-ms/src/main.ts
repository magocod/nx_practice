import { NestFactory } from '@nestjs/core';
import { RedisMsModule } from './redis-ms.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RedisMsModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379
    }
  });
  await app.listen();
}
bootstrap();
