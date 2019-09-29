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

export interface RequestCustomDataInterface {
  cacheRelatedModel?: string[];
}

export interface ExpressRequestWithCustomDataInterface extends Request {
  _data: RequestCustomDataInterface;
}

export interface ExpressRequestWithFileInterface extends Request {
  readonly file?: UploadFileInterface;
}