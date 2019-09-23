import { HttpException, HttpStatus } from '@nestjs/common';

import { 
  createInvalidWxSignatureCommonResponse,
  createInvalidUploadFileTypeCommonResponse,
  createInvalidUploadFileSizeCommonResponse,
  createUploadFileEmptyCommonResponse,
  createInvalidPayloadCommonResponse
} from '../utils/response.util'

export class InvalidWxSignatureException extends HttpException {
  constructor() {
    super(createInvalidWxSignatureCommonResponse(), HttpStatus.BAD_REQUEST);
  }
}

export class InvalidUploadFileTypeException extends HttpException {
  constructor() {
    super(createInvalidUploadFileTypeCommonResponse(), HttpStatus.BAD_REQUEST);
  }
}

export class InvalidUploadFileSizeException extends HttpException {
  constructor() {
    super(createInvalidUploadFileSizeCommonResponse(), HttpStatus.BAD_REQUEST);
  }
}

export class UploadFileEmptyException extends HttpException {
  constructor() {
    super(createUploadFileEmptyCommonResponse(), HttpStatus.BAD_REQUEST);
  }
}

export class InvalidPayloadException extends HttpException {
  constructor(data: string) {
    super(createInvalidPayloadCommonResponse(data), HttpStatus.BAD_REQUEST);
  }
}