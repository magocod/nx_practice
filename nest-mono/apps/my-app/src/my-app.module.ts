import { Module } from '@nestjs/common';
import { MyLibraryModule } from "@app/my-library"
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { MATH_SERVICE, REDIS_SERVICE } from "@app/utils-ms";


@Module({
  imports: [
    MyLibraryModule,
    ClientsModule.register([
      {
        name: MATH_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 4000,
        },
      },
      {
        name: REDIS_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        }
      },
    ]),
  ],
  controllers: [MyAppController],
  providers: [MyAppService],
})
export class MyAppModule {}
