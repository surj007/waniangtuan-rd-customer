import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { TestService } from './test.service';
import { createSuccessCommonRes } from '../../utils/response.util';
import { CommonResDto } from '../../dto/commonRes.dto';
import { TestEntity } from '../../entities/test.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { TestSwaggerClass } from './test.swagger';

@Controller('/test')
@UseGuards(AuthGuard)
@ApiUseTags('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  /**
   * @method 根据用户名获取用户数据
   * @author surongjian
   * @time   2019.09.09
   * @params name 用户名
   * @return 用户数据
   */
  @Get()
  @ApiOperation({ title: '测试接口，根据用户名获取用户数据' })
  @ApiOkResponse({
    type: TestSwaggerClass,
    isArray: true,
    description: '用户数据'
  })
  async findByName(@Query('name') name: string): Promise<CommonResDto<TestEntity[]>> {
    return createSuccessCommonRes<TestEntity[]>(
      await this.testService.findByName(name)
    );
  }
}
