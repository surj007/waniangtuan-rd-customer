import { LoginUserInfoInterface } from './common.interface';

interface ExpressCookieInterface {
  originalMaxAge: number;
  expires: string;
  httpOnly: boolean;
  path: string;
}

export interface ExpressSessionInterface {
  cookie?: ExpressCookieInterface;
  userInfo?: LoginUserInfoInterface;
  _garbage?: string;
  touch(): any;
}