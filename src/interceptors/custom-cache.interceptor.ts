import { 
  Injectable, 
  CacheInterceptor, 
  ExecutionContext, 
  NestInterceptor,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';

import { ExpressRequestWithCustomDataInterface } from '../interfaces/express.interface';
import { CustomGlobalInterface } from '../interfaces/common.interface';
import { DbErrException } from '../exceptions/internal-server-error.exception';
import { RedisService } from '../modules/global/services/redis.service';

@Injectable()
export class SetCustomCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const redisService: RedisService = (<CustomGlobalInterface>global).app.get(RedisService);
    const httpAdapter: any = this.httpAdapterHost.httpAdapter;
    const req: ExpressRequestWithCustomDataInterface = context.getArgByIndex<ExpressRequestWithCustomDataInterface>(0);
    const res: Response = context.switchToHttp().getResponse();

    if (httpAdapter.getRequestMethod(req) !== 'GET') {
      return undefined;
    }

    redisService.setSet(
      'interface:keys:set', 
      [ `interface:${req._data.cacheRelatedModel}:${httpAdapter.getRequestUrl(req)}:string` ]
    ).catch(err => {
      console.error(`[srj] [${res.get('X-Request-Id')}] redis set interface:keys:set err: `, err);
    });

    return `interface:${req._data.cacheRelatedModel}:${httpAdapter.getRequestUrl(req)}:string`;
  }
}

@Injectable()
export class DelCustomCacheInterceptor implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req: ExpressRequestWithCustomDataInterface = context.switchToHttp().getRequest();
    let needDelKeys: string[] = [];

    try {
      needDelKeys = (await this.redisService.getAllSetMembers('interface:keys:set')).filter(key => {
        return key.split(':')[1].split(',').filter(model => (<string[]>req._data.cacheRelatedModel).includes(model)).length > 0;
      });

      await Promise.all([
        this.redisService.delByKeys(needDelKeys),
        this.redisService.delSetMembers('interface:keys:set', needDelKeys)
      ]);
    }
    catch(err) {
      throw new DbErrException(err, 'redis');
    }

    return next.handle().pipe(tap(() => {
      setTimeout(() => {
        this.redisService.delByKeys(needDelKeys);
      }, 1000);
    }));
  }
}