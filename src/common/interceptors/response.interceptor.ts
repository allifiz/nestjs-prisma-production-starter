import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((response) => {
        if (response && typeof response === 'object' && 'status' in response) {
          return response;
        }

        return {
          status: true,
          message: 'Success',
          data: response,
        };
      }),
    );
  }
}
