import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchequerService {
  getHello(): string {
    return 'Hello World!';
  }
}
