import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

import { 
  RequestCustomerDataInterface, 
  ExpressRequestWithCustomerDataInterface 
} from '../interfaces/express.interface';

@Injectable()
export class CacheRelatedModelInterceptor implements NestInterceptor {
  constructor(private readonly relatedModel: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: ExpressRequestWithCustomerDataInterface = context.switchToHttp().getRequest<ExpressRequestWithCustomerDataInterface>();

    if (req._data === undefined) {
      req._data = <RequestCustomerDataInterface>{};
    }

    req._data.cacheRelatedModel = this.relatedModel;
    
    return next.handle();
  }
}