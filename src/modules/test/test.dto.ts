import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, ArrayUnique, ArrayNotEmpty, IsArray } from 'class-validator';

export class GetUserInfoByUsernameResponseDto {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly age: number;
}

export class PostMomentRequestDto {
  @IsString()
  @ApiModelProperty()
  readonly content: string;
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiModelProperty()
  readonly images: string[];
}