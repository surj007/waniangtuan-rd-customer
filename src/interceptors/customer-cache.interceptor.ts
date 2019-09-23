import { 
  Injectable, 
  CacheInterceptor, 
  ExecutionContext, 
  NestInterceptor,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExpressRequestWithCustomerDataInterface } from '../interfaces/express.interface';
import { DbErrException } from '../exceptions/internal-server-error.exception';
import { RedisDbEnum } from '../enum/config.enum';
import { RedisService } from '../modules/global/services/redis.service';

@Injectable()
export class SetCustomerCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const CACHE_KEY_METADATA = 'cache_module:cache_key';
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;

    if (!isHttpApp) {
      return this.reflector.get(CACHE_KEY_METADATA, context.getHandler());
    }

    const request = context.getArgByIndex<ExpressRequestWithCustomerDataInterface>(0);

    if (httpAdapter.getRequestMethod(request) !== 'GET') {
      return undefined;
    }

    return `cache:${request._data.cacheRelatedModel}:${httpAdapter.getRequestUrl(request)}`;
  }
}

@Injectable()
export class DelCustomerCacheInterceptor implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req: ExpressRequestWithCustomerDataInterface = context.switchToHttp().getRequest();
    let needDelKeys: string[] = [];
    let promiseArray: Promise<string[]>[] = [];

    for (let i of <any>(req._data).cacheRelatedModel) {
      promiseArray.push(this.redisService.getKeys(`cache:*${i}*:*`, RedisDbEnum.CacheDb));
    }

    try {
      needDelKeys = (await Promise.all(promiseArray)).reduce((result: string[], item: string[]) => result.concat(item), []);

      await this.redisService.del(needDelKeys, RedisDbEnum.CacheDb);
    }
    catch(err) {
      throw new DbErrException(err, 'redis');
    }

    return next.handle().pipe(tap(() => {
      setTimeout(() => {
        this.redisService.del(needDelKeys, RedisDbEnum.CacheDb);
      }, 1000);
    }));
  }
}