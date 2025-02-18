import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { isObject } from 'class-validator';
import { map, Observable } from 'rxjs';

@Injectable()
export class StandardizeResponseInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        if (data === undefined || data === null) return;
        if (isObject(data) && 'data' in data) return data;

        return { data };
      }),
    );
  }
}
