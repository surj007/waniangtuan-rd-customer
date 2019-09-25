import { HttpException, INestApplication } from '@nestjs/common';

import { WxLocationInterface } from './wx.interface';

export interface LoginUserInfoInterface {
  readonly unionId: string;
  readonly openId: string;
  readonly loginCode: string;
  readonly iv: string;
  readonly sessionKey : string;
  readonly nickName: string;
  readonly avatarUrl: string;
  readonly gender: number;
  readonly country: string;
  readonly province: string;
  readonly city: string;
  readonly locationInfo: WxLocationInterface;
}

export interface UploadFileInterface {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding: string;
  readonly mimetype: string;
  readonly buffer: Buffer;
  readonly size: number;
}

export interface DbErrExceptionInterface extends HttpException {
  getResponse(): {
    readonly err: Error;
    readonly type?: string;
    readonly consoleMessage?: string;
  };
}

export interface CustomGlobalInterface extends NodeJS.Global {
  app: INestApplication;
}