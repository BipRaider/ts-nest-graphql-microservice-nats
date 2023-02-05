import { Module } from '@nestjs/common';
import { DateScalar } from './date.scalar';
import { ObjectIdScalar } from './mongoId.scalar';

/*** Add the scalar classes to `app.module` -> `import` for add them to the graphql schema.*/
@Module({
  providers: [DateScalar, ObjectIdScalar],
})
export class ScalarModule {}
