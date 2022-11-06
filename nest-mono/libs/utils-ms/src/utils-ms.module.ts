import { Module } from '@nestjs/common';
import { UtilsMsService } from './utils-ms.service';

@Module({
  providers: [UtilsMsService],
  exports: [UtilsMsService],
})
export class UtilsMsModule {}
