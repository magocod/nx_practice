import {Inject, Injectable} from '@nestjs/common';
import {MyLibraryService} from "@app/my-library";
import {
  RABBIT_SERVICE,
  RabbitCmdGreetingData,
  rabbitCmdGreetingPattern,
  RabbitCmdGreetingResult,
  RabbitEventCreatedData,
  RabbitMsEvents
} from "@app/utils-ms";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom, timeout} from "rxjs";

@Injectable()
export class AppService {
  constructor(
    private readonly myLibraryService: MyLibraryService,
    @Inject(RABBIT_SERVICE) private rabbitMsClient: ClientProxy
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getLibrary(): Promise<string> {
    console.log('call microservice rabbit')
    let r = await lastValueFrom(
      this.rabbitMsClient.send<RabbitCmdGreetingData, RabbitCmdGreetingResult>(
        rabbitCmdGreetingPattern, 'nest-mono'
      ).pipe(timeout(5000))
    );
    console.log('microservice rabbit', r)

    console.log('call microservice rabbit event')
    const e = await lastValueFrom(
      this.rabbitMsClient.emit<undefined, RabbitEventCreatedData>(
        RabbitMsEvents.eventCreated,
        {'message': 'nest-mono', 'text': '...'})
    );
    console.log('emit rs', e)

    return 'call lib: ' + this.myLibraryService.call() + ', ms rabbit: ' + r;
  }
}
