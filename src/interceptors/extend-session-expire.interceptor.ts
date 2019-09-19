import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExpressSessionInterface } from '../interfaces/express.interface';

@Injectable()
export class ExtendSessionExpireInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let session: ExpressSessionInterface = <ExpressSessionInterface>(context.switchToHttp().getRequest().session);
    
    return next.handle().pipe(tap(() => {
      if (session.userInfo) {
        session._garbage = Date();
        session.touch();
      }
    }));
  }
}