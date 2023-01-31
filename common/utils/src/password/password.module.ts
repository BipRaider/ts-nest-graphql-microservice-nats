import { Module } from '@nestjs/common';

import { PasswordUtil } from './password';

@Module({
  exports: [PasswordUtil],
  providers: [PasswordUtil],
})
export class PasswordModule {}
