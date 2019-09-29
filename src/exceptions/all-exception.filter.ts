import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

import { 
  createUnhandleExceptionCommonResponse, 
  createInvalidPayloadCommonResponse 
} from '../utils/response.util';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse<Response>();

    if (!(exception instanceof HttpException)) {
      console.error(`[srj] [${res.get('X-Request-Id')}] unhandle code exception: `, exception);

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(createUnhandleExceptionCommonResponse());
    }
    else if (
      exception.getStatus() === 400 && 
      exception.message.message &&
      exception.message.message[0] instanceof ValidationError
    ) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(createInvalidPayloadCommonResponse(exception.message.message));
    }
    else if (
      exception.getStatus() === 400 &&
      exception.message.message &&
      exception.message.message === 'Unexpected field'
    ) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(createInvalidPayloadCommonResponse('[file] field is required'));
    }
    else {
      super.catch(exception, host);
    }
  }
}