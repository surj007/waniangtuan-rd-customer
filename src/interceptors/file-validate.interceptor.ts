import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { object, string, number, Schema, binary } from 'joi';

import { UploadFileInterface } from '../interfaces/common.interface';
import { ExpressRequestWithFileInterface } from '../interfaces/express.interface';
import { isValidFileSize, isValidFileType } from '../utils/common.util';
import { 
  UploadFileEmptyException,
  InvalidUploadFileTypeException, 
  InvalidUploadFileSizeException 
} from '../exceptions/bad-request.exception';

const schema: Schema = object({
  fieldname: string().required(),
  originalname: string().required(),
  encoding: string().required(),
  mimetype: string().required(),
  buffer: binary().required(),
  size: number().integer().required()
});

@Injectable()
export class FileValidateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const file: UploadFileInterface | undefined = context.switchToHttp().getRequest<ExpressRequestWithFileInterface>().file;

    if (file === undefined || schema.validate(file).error !== null) {
      throw new UploadFileEmptyException();
    }
    if (!isValidFileType(file.buffer)) {
      throw new InvalidUploadFileTypeException();
    }
    if (!isValidFileSize(file.size)) {
      throw new InvalidUploadFileSizeException();
    }

    return next.handle();
  }
}