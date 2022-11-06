import {Inject, Injectable} from '@nestjs/common';
import { MyLibraryService } from "@app/my-library"
import {ClientProxy} from "@nestjs/microservices";
import {
  MATH_SERVICE,
  CmdSumData,
  CmdSumResult,
  REDIS_SERVICE,
  redisCmdGreetingPattern,
  RedisCmdGreetingData, RedisCmdGreetingResult, RedisMsEvents, RedisEventCreatedData
} from "@app/utils-ms";
import {lastValueFrom} from "rxjs";

@Injectable()
export class MyAppService {

  constructor(
    private readonly myLibraryService: MyLibraryService,
    @Inject(MATH_SERVICE) private client: ClientProxy,
    @Inject(REDIS_SERVICE) private redisMsClient: ClientProxy
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getLibrary(): Promise<string> {
    console.log('call microservice tcp')
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    const v = await lastValueFrom(
      this.client.send<CmdSumResult, CmdSumData>(pattern, payload)
    );
    console.log('microservice rs', v)

    console.log('call microservice redis')
    const r = await lastValueFrom(
      this.redisMsClient.send<RedisCmdGreetingData, RedisCmdGreetingResult>(
        redisCmdGreetingPattern, 'my-app'
      )
    );
    console.log('microservice redis', r)

    console.log('call microservice redis event')
    const e = await lastValueFrom(
      this.redisMsClient.emit<undefined, RedisEventCreatedData>(
        RedisMsEvents.eventCreated,
        {'message': 'my-ms', 'text': '...'})
    );
    console.log('emit rs', e)

    return 'call lib: ' + this.myLibraryService.call() + ', ms: ' + v + ', redis: ' + r;
  }
}
