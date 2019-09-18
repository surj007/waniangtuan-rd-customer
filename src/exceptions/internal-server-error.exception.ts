import { HttpException, HttpStatus } from '@nestjs/common';

import { createDbErrCommonRes, createWxApiErrCommonRes } from '../utils/response.util'

export class DbErrException extends HttpException {
  constructor() {
    super(createDbErrCommonRes(), HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class WxApiErrException extends HttpException {
  constructor() {
    super(createWxApiErrCommonRes(), HttpStatus.INTERNAL_SERVER_ERROR);
  }
}