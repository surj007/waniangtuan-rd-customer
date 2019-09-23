import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { InvalidPayloadException } from '../exceptions/bad-request.exception';

@Injectable()
export class QueryParamRequiredValidatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === undefined) {
      throw new InvalidPayloadException(`[${<string>metadata.data}] field is required`);
    }
    else {
      return value;
    }
  }
}