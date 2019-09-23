import { HttpException, HttpStatus } from '@nestjs/common';

export class DbErrException extends HttpException {
  constructor(err: Error, type: string) {
    super({
      err,
      type
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ApiErrException extends HttpException {
  constructor(consoleMessage: string, err: any) {
    super({
      consoleMessage, 
      err
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}