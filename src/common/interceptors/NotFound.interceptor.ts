import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((value) => {
        if (!value) {
          throw new NotFoundException({
            statusCode: 404,
            message: 'Item not Found',
            error: 'NotFound',
          });
        }
      }),
    );
  }
}
