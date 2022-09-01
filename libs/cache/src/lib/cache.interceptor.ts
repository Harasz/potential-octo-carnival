import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<unknown>> {
    const cacheKey = context.switchToHttp().getRequest<Request>().url;

    try {
      const cachedResponse = await this.cacheService.get(cacheKey);

      if (cachedResponse) {
        return of(cachedResponse);
      }

      return next.handle().pipe(
        tap((response) => {
          this.cacheService.set(cacheKey, response);
        })
      );
    } catch (err) {
      console.log(err);
      return next.handle();
    }
  }
}
