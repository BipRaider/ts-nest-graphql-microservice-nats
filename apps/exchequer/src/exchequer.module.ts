import { Module } from '@nestjs/common';
import { ExchequerController } from './exchequer.controller';
import { ExchequerService } from './exchequer.service';

@Module({
  imports: [],
  controllers: [ExchequerController],
  providers: [ExchequerService],
})
export class ExchequerModule {}
