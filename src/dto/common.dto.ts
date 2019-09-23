import { ApiModelProperty } from '@nestjs/swagger';

import { ResponseCodeEnum } from '../enum/response.enum';

export interface CommonResponseDto<T = any> {
  readonly code: ResponseCodeEnum;
  readonly message: string;
  readonly data: T;
}

export class UploadFileResponseDto {
  @ApiModelProperty()
  readonly fileTmpUrl: string;
  @ApiModelProperty()
  readonly fileTmpPath: string;
  @ApiModelProperty()
  readonly fileSize: number;
  @ApiModelProperty()
  readonly fileName: string;
}