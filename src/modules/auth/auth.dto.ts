import { IsNotEmpty, IsString, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { WxUserInfoDto, WxLocationDto } from '../../dto/wx.dto';

export class UserInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly loginCode: string;
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly encryptedData: string;
  @IsDefined()
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
  @IsDefined()
  @ApiModelProperty()
  readonly locationInfo: WxLocationDto;
}