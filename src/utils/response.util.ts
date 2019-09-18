import { CommonResDto } from '../dto/commonRes.dto';
import { ResCodeEnum } from '../enum/response.enum';

export function createSuccessCommonRes<T>(data: T, msg: string = 'ok'): CommonResDto<T> {
  return {
    code: ResCodeEnum.Success,
    msg,
    data
  };
}

export function createUnauthorizedCommonRes(): CommonResDto<null> {
  return {
    code: ResCodeEnum.Unauthorized,
    msg: '请登陆',
    data: null
  };
}

export function createDbErrCommonRes(): CommonResDto<null> {
  return {
    code: ResCodeEnum.DbErr,
    msg: '网络错误，请稍后重试',
    data: null
  };
}

export function createWxApiErrCommonRes(): CommonResDto<null> {
  return {
    code: ResCodeEnum.WxApiErr,
    msg: '网络错误，请稍后重试',
    data: null
  };
}

export function createInvalidWxSignatureCommonRes(): CommonResDto<null> {
  return {
    code: ResCodeEnum.InvalidWxSignature,
    msg: '网络错误，请稍后重试',
    data: null
  };
}