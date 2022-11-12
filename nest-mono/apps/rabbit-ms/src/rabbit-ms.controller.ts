import { Controller } from '@nestjs/common';
import {EventPattern, MessagePattern} from "@nestjs/microservices";
import {rabbitCmdGreetingPattern, RabbitEventCreatedData, RabbitMsEvents} from "@app/utils-ms";

@Controller()
export class RabbitMsController {
  @MessagePattern(rabbitCmdGreetingPattern)
  getGreetingMessage(name: string): string {
    console.log('call rabbit ms, message')
    return `Hello ${name}`;
  }

  @EventPattern(RabbitMsEvents.eventCreated)
  async handleEventCreated(data: RabbitEventCreatedData) {
    console.log('rabbit ms event: ', RabbitMsEvents.eventCreated)
    console.log(data);
  }
}
