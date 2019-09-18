import { HttpException, HttpStatus } from '@nestjs/common';

import { createUnauthorizedCommonRes } from '../utils/response.util'

export class UnauthorizedException extends HttpException {
  constructor() {
    super(createUnauthorizedCommonRes(), HttpStatus.UNAUTHORIZED);
  }
}