import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ErrorsLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const name: string = context.getHandler().name;
    const contextType: string = context.getType();
    const logger: Logger = new Logger(contextType.toUpperCase());
    let log = false;
    let status = 200;

    return next
      .handle()
      .pipe(
        map(data => {
          if (data?.status) {
            log = true;
            status = data.status;
          }
          return data;
        }),
      )
      .pipe(
        tap(() => {
          return log ? logger.error(`${name}:${status}`) : logger.log(name);
        }),
      );
  }
}
