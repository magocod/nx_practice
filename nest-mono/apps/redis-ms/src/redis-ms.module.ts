import { Module } from '@nestjs/common';
import { RedisMsController } from './redis-ms.controller';

@Module({
  imports: [],
  controllers: [RedisMsController],
  providers: [],
})
export class RedisMsModule {}
