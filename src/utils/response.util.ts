import { CommonResInterface } from '../interfaces/response.interface';
import { ResCodeEnum } from '../enum/response.enum';

export function createSuccessCommonRes<T>(data: T, msg: string = 'ok'): CommonResInterface<T> {
  return {
    code: ResCodeEnum.Success,
    msg,
    data
  };
}