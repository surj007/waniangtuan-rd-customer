import { HttpException, HttpStatus } from '@nestjs/common';

import { createUnauthorizedCommonResponse } from '../utils/response.util'

export class UnauthorizedException extends HttpException {
  constructor() {
    super(createUnauthorizedCommonResponse(), HttpStatus.UNAUTHORIZED);
  }
}