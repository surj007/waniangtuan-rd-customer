import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { ExpressSessionInterface } from '../interfaces/express.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const session: ExpressSessionInterface = <ExpressSessionInterface>(context.switchToHttp().getRequest().session);

    if (session.userInfo && session.userInfo.unionId) {
      return true;
    }
    else {
      throw new UnauthorizedException();
    }
  }
}