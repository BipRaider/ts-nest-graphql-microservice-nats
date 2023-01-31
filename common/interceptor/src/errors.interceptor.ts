import { Injectable, NestInterceptor, ExecutionContext, BadGatewayException, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        console.log('err---->');
        if (err instanceof BadGatewayException) throw err;
        throw throwError(new BadGatewayException(err.message));
      }),
    );
  }
}
