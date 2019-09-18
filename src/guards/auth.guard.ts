import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UnauthorizedException } from '../exceptions/unauthorized.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (
      context.switchToHttp().getRequest().session.userInfo &&
      context.switchToHttp().getRequest().session.userInfo.unionId
    ) {
      return true;
    }
    else {
      throw new UnauthorizedException();
    }
  }
}