import { Controller, Get, Query } from '@nestjs/common';
import { TestService } from './test.service';
import { createSuccessCommonRes } from '../../utils/response.util';
import { CommonResInterface } from '../../interfaces/response.interface';
import { TestEntity } from './test.entity';

@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  /**
   * @method 根据用户名获取数据
   * @author surongjian
   * @time   2019.09.09
   * @params name 用户名
   * @return 数据
   */
  @Get()
  async findByName(@Query('name') name: string): Promise<CommonResInterface<TestEntity[]>> {
    return createSuccessCommonRes<TestEntity[]>(await this.testService.findByName(name));
  }
}
