import { Controller, Get } from '@nestjs/common';
import { ExchequerService } from './exchequer.service';

@Controller()
export class ExchequerController {
  constructor(private readonly exchequerService: ExchequerService) {}

  @Get()
  getHello(): string {
    return this.exchequerService.getHello();
  }
}
