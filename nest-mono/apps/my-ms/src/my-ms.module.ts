import { Module } from '@nestjs/common';
import { MyMsController } from './my-ms.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {REDIS_SERVICE} from "@app/utils-ms";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REDIS_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [MyMsController],
  providers: [],
})
export class MyMsModule {}
