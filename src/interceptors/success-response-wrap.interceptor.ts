import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createSuccessCommonResponse } from '../utils/response.util';
import { CommonResponseDto } from '../dto/common.dto';

@Injectable()
export class SuccessResponseWrapInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponseDto<any>> {
    return next.handle().pipe(map(data => createSuccessCommonResponse(data)));
  }
}