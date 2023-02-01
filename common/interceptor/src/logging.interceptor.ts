import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const name: string = context.getHandler().name;
    const contextType: string = context.getType();
    const logger: Logger = new Logger(contextType.toUpperCase());

    return next.handle().pipe(tap(() => logger.log(name)));
  }
}
