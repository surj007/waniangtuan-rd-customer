import { ResCodeEnum } from '../enum/response.enum';

export class CommonResDto<T> {
  readonly code: ResCodeEnum;
  readonly msg: string;
  readonly data: T;
}