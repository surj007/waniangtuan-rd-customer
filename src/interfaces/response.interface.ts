import { Request } from 'express';

import { ResCodeEnum } from '../enum/response.enum';

export interface CommonResInterface<T> {
  readonly code: ResCodeEnum;
  readonly msg: string;
  readonly data: T;
}

export interface ExpressReqWithSessionInterface extends Request {
  session: Express.Session;
}