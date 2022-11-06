import { NestFactory } from '@nestjs/core';
import { MyMsModule } from './my-ms.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MyMsModule, {
    transport: Transport.TCP,
    options: {
      port: 4000
    }
  });
  await app.listen();
}
bootstrap();
