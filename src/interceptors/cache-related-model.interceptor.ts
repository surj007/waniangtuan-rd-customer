import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

import { 
  RequestCustomDataInterface, 
  ExpressRequestWithCustomDataInterface 
} from '../interfaces/express.interface';

@Injectable()
export class CacheRelatedModelInterceptor implements NestInterceptor {
  constructor(private readonly relatedModel: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: ExpressRequestWithCustomDataInterface = context.switchToHttp().getRequest<ExpressRequestWithCustomDataInterface>();

    if (req._data === undefined) {
      req._data = <RequestCustomDataInterface>{};
    }

    req._data.cacheRelatedModel = this.relatedModel;
    
    return next.handle();
  }
}