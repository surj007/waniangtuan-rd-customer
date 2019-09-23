import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ExpressSessionInterface } from '../interfaces/express.interface';

@Injectable()
export class ExtendSessionExpireInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let session: ExpressSessionInterface = <ExpressSessionInterface>(context.switchToHttp().getRequest().session);

    if (session.userInfo !== undefined) {
      session._garbage = Date();
      session.touch();
    }
    
    return next.handle();
  }
}