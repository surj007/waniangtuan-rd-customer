import { Request } from 'express';

import { LoginUserInfoInterface, UploadFileInterface } from './common.interface';

interface ExpressCookieInterface {
  readonly originalMaxAge: number;
  readonly expires: string;
  readonly httpOnly: boolean;
  readonly path: string;
}

export interface ExpressSessionInterface {
  readonly cookie: ExpressCookieInterface;
  userInfo?: LoginUserInfoInterface;
  _garbage?: string;
  touch(): any;
}

export interface ExpressSessionWithUserInfoInterface {
  readonly cookie: ExpressCookieInterface;
  readonly userInfo: LoginUserInfoInterface;
  readonly _garbage: string;
  touch(): any;
}

export interface RequestCustomerDataInterface {
  cacheRelatedModel?: string[];
}

export interface ExpressRequestWithCustomerDataInterface extends Request {
  _data: RequestCustomerDataInterface;
}

export interface ExpressRequestWithFileInterface extends Request {
  readonly file?: UploadFileInterface;
}