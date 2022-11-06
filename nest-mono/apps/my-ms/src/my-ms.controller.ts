import {Controller, Inject} from '@nestjs/common';
import {ClientProxy, MessagePattern} from '@nestjs/microservices';
import {cmdSumPattern, CmdSumResult, REDIS_SERVICE, RedisEventCreatedData, RedisMsEvents} from '@app/utils-ms';
import {MyLibraryService} from "@app/my-library";
import {lastValueFrom} from "rxjs";

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
        {'message': 'my-app', 'text': '...'})
    );
    return (data || []).reduce((a, b) => a + b);
  }
}
