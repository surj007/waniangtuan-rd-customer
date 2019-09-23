import { Catch, ArgumentsHost, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { DbErrException } from '../exceptions/internal-server-error.exception';
import { DbErrExceptionInterface } from '../interfaces/common.interface';
import { createDbErrCommonResponse } from '../utils/response.util';

@Catch(DbErrException)
export class DbErrExceptionFilter implements ExceptionFilter  {
  catch(exception: DbErrExceptionInterface, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse<Response>();

    console.error(`[srj] [${res.get('X-Request-Id')}] ${exception.getResponse().type} err: `, exception.getResponse().err);

    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(createDbErrCommonResponse());
  }
}