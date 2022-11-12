export const RABBIT_SERVICE = 'REDIS_SERVICE';

export enum RabbitCmd {
  greeting = 'greeting'
}

export enum RabbitMsEvents {
  eventCreated = 'event-created'
}

export type RabbitEventCreatedData = Record<string, unknown>

// patterns

export const rabbitCmdGreetingPattern =  { cmd: RabbitCmd.greeting }
export type RabbitCmdGreetingData = string;
export type RabbitCmdGreetingResult = string;
