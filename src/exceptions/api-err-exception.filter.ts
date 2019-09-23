import { Catch, ArgumentsHost, HttpStatus, ExceptionFilter  } from '@nestjs/common';
import { Response } from 'express';

import { ApiErrException } from '../exceptions/internal-server-error.exception';
import { createApiErrCommonResponse } from '../utils/response.util';

@Catch(ApiErrException)
export class ApiErrExceptionFilter implements ExceptionFilter  {
  catch(exception: any, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse<Response>();

    console.error(
      `[srj] [${res.get('X-Request-Id')}] ${exception.response.consoleMessage}: `, 
      exception.response.err
    );

    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(createApiErrCommonResponse());
  }
}