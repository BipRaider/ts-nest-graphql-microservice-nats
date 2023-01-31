import { Module } from '@nestjs/common';
import { DateScalar } from './date.scalar';
import { ObjectIdScalar } from './mongoId.scalar';

@Module({
  providers: [DateScalar, ObjectIdScalar],
})
export class ScalarModule {}
