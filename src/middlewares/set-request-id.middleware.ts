import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v1 } from  'uuid';

@Injectable()
export class SetRequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('X-Request-Id', v1());

    next();
  }
}