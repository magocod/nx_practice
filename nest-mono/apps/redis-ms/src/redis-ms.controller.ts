import { Controller } from '@nestjs/common';
import {EventPattern, MessagePattern} from "@nestjs/microservices";
import {redisCmdGreetingPattern, RedisMsEvents, RedisEventCreatedData} from "@app/utils-ms";

@Controller()
export class RedisMsController {
  @MessagePattern(redisCmdGreetingPattern)
  getGreetingMessage(name: string): string {
    console.log('call redis ms, message')
    return `Hello ${name}`;
  }

  @EventPattern(RedisMsEvents.eventCreated)
  async handleEventCreated(data: RedisEventCreatedData) {
    console.log('redis ms event: ', RedisMsEvents.eventCreated)
    console.log(data);
  }
}
