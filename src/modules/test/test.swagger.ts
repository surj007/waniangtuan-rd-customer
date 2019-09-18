import { ApiModelProperty } from '@nestjs/swagger';

export class TestSwaggerClass {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly age: number;
}