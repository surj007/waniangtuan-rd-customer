import { HttpException, HttpStatus } from '@nestjs/common';

import { createInvalidWxSignatureCommonRes } from '../utils/response.util'

export class InvalidWxSignatureException extends HttpException {
  constructor() {
    super(createInvalidWxSignatureCommonRes(), HttpStatus.BAD_REQUEST);
  }
}