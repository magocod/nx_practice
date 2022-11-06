export const REDIS_SERVICE = 'REDIS_SERVICE';

export enum RedisCmd {
  greeting = 'greeting'
}

export enum RedisMsEvents {
  eventCreated = 'event-created'
}

export type RedisEventCreatedData = Record<string, unknown>

// patterns

export const redisCmdGreetingPattern =  { cmd: RedisCmd.greeting }
export type RedisCmdGreetingData = string;
export type RedisCmdGreetingResult = string;
