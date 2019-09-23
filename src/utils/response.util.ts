import { ValidationError } from 'class-validator';

import { CommonResponseDto } from '../dto/common.dto';
import { ResponseCodeEnum } from '../enum/response.enum';

export function createSuccessCommonResponse(data: any, message: string = 'ok'): CommonResponseDto {
  return {
    code: ResponseCodeEnum.Success,
    message,
    data
  };
}

export function createUnauthorizedCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.Unauthorized,
    message: '请登陆',
    data: null
  };
}

export function createDbErrCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.DbErr,
    message: '网络错误，请稍后重试',
    data: null
  };
}

export function createApiErrCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.ApiError,
    message: '网络错误，请稍后重试',
    data: null
  };
}

export function createInvalidWxSignatureCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.InvalidWxSignature,
    message: '网络错误，请稍后重试',
    data: null
  };
}

export function createInvalidUploadFileTypeCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.InvalidUploadFile,
    message: '只支持上传png、jpg、jpeg、gif格式的文件',
    data: null
  };
}

export function createInvalidUploadFileSizeCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.InvalidUploadFile,
    message: '只支持上传大于0并且小于10M的文件',
    data: null
  };
}

export function createUnhandleExceptionCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.UnhandleException,
    message: '网络错误，请稍后重试',
    data: null
  };
}

export function createUploadFileEmptyCommonResponse(): CommonResponseDto<null> {
  return {
    code: ResponseCodeEnum.InvalidPayload,
    message: '必须上传文件',
    data: null
  };
}

export function createInvalidPayloadCommonResponse(
  data: ValidationError[] | string
): CommonResponseDto<ValidationError[] | string> {
  return {
    code: ResponseCodeEnum.InvalidPayload,
    message: '参数错误',
    data
  };
}