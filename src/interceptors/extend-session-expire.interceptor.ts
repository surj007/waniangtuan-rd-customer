import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ExtendSessionExpireInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(tap(() => {
      if (context.switchToHttp().getRequest().session.userInfo) {
        context.switchToHttp().getRequest().session._garbage = Date();
        context.switchToHttp().getRequest().session.touch();
      }
    }));
  }
}