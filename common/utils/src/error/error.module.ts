import { Module } from '@nestjs/common';
import { ErrorUtil } from './errors';

@Module({
  exports: [ErrorUtil],
  providers: [ErrorUtil],
})
export class ErrorModule {}
