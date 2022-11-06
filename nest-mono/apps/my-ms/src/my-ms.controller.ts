import {Controller, Inject} from '@nestjs/common';
import {ClientProxy, MessagePattern} from '@nestjs/microservices';
import {
  cmdSumPattern,
  CmdSumResult,
  REDIS_SERVICE,
  RedisCmdGreetingData, redisCmdGreetingPattern, RedisCmdGreetingResult,
  RedisEventCreatedData,
  RedisMsEvents
} from '@app/utils-ms';
import {lastValueFrom, timeout} from "rxjs";

@Controller()
export class MyMsController {

  constructor(
    @Inject(REDIS_SERVICE) private redisMsClient: ClientProxy
  ) {}

  @MessagePattern(cmdSumPattern)
  async accumulate(data: number[]): Promise<CmdSumResult> {
    console.log('service called')
    await lastValueFrom(
      this.redisMsClient.emit<undefined, RedisEventCreatedData>(
        RedisMsEvents.eventCreated,
        {'message': 'my-ms', 'text': '...'})
    );
    console.log('call microservice redis')
    const r = await lastValueFrom(
      this.redisMsClient.send<RedisCmdGreetingData, RedisCmdGreetingResult>(
        redisCmdGreetingPattern, 'my-ms'
      ).pipe(timeout(3000))
    );
    console.log('microservice redis', r)
    return (data || []).reduce((a, b) => a + b);
  }
}
