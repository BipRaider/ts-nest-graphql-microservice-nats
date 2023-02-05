import { Module } from '@nestjs/common';
import { HelperUtil } from './helper';

@Module({
  providers: [HelperUtil],
  exports: [HelperUtil],
})
export class HelperUtilModule {}
