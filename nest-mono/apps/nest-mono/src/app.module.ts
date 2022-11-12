import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { MyLibraryModule } from "@app/my-library"
import {RABBIT_SERVICE} from "@app/utils-ms";

@Module({
  imports: [
    MyLibraryModule,
    ClientsModule.register([
      {
        name: RABBIT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://root:123@localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
