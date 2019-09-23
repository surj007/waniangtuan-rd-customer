import { ApiModelProperty } from "@nestjs/swagger";
import { 
  IsNotEmpty, 
  IsUrl, 
  IsInt, 
  IsIn, 
  IsString, 
  IsNumber 
} from 'class-validator';

export class WxUserInfoDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly nickName: string;
  @IsUrl()
  @ApiModelProperty()
  readonly avatarUrl: string;
  @IsIn([ 0, 1, 2 ])
  @ApiModelProperty()
  readonly gender: number;
  @IsString()
  @ApiModelProperty()
  readonly country: string;
  @IsString()
  @ApiModelProperty()
  readonly province: string;
  @IsString()
  @ApiModelProperty()
  readonly city: string;
}

export class WxLocationDto {
  @IsNumber()
  @ApiModelProperty()
  readonly latitude: number;
  @IsNumber()
  @ApiModelProperty()
  readonly longitude: number;
  @IsNumber()
  @ApiModelProperty()
  readonly speed: number;
  @IsInt()
  @ApiModelProperty()
  readonly accuracy: number;
  @IsInt()
  @ApiModelProperty()
  readonly horizontalAccuracy: number;
  @IsInt()
  @ApiModelProperty()
  readonly verticalAccuracy: number;
  errMsg?: string;
}

export interface WxOpenIdAndSessionKeyReqestDto {
  readonly appid: string;
  readonly secret: string;
  readonly js_code: string;
}

export interface WxOpenIdAndSessionKeyResponseDto {
  readonly session_key: string;
  readonly openid: string;
}