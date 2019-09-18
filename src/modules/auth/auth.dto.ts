import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { WxUserInfoDto, WxLocationDto } from '../../dto/user.dto';

export class UserInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly loginCode: string;
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly encryptedData: string;
  @ApiModelProperty()
  readonly userInfo: WxUserInfoDto;
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly signature: string;
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly iv: string;
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly rawData: string;
  @ApiModelProperty()
  readonly locationInfo: WxLocationDto;
}