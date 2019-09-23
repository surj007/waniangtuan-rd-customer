import { 
  Controller, 
  Get, 
  Query, 
  UseGuards, 
  Post, 
  HttpCode,
  Session,
  Body,
  UseInterceptors
} from '@nestjs/common';
import { 
  ApiUseTags, 
  ApiOkResponse, 
  ApiOperation,
  ApiImplicitHeader
} from '@nestjs/swagger';

import { TestService } from './test.service';
import { TestEntity } from '../../entities/test.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { CacheRelatedModelInterceptor } from '../../interceptors/cache-related-model.interceptor';
import { 
  SetCustomerCacheInterceptor,
  DelCustomerCacheInterceptor
} from '../../interceptors/customer-cache.interceptor';
import { QueryParamRequiredValidatePipe } from '../../pipe/query-param-validate.pipe';
import { GetUserInfoByUsernameResponseDto, PostMomentRequestDto } from './test.dto';
import { ExpressSessionWithUserInfoInterface } from '../../interfaces/express.interface';

@Controller('/test')
@ApiUseTags('test')
@UseGuards(AuthGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  /**
   * @method 根据用户名获取用户数据
   * @author surongjian
   * @time   2019.09.19
   * @params name 用户名
   * @return 用户数据
   */
  @Get('/getUserInfoByUsername')
  @UseInterceptors(new CacheRelatedModelInterceptor([ 'test', 'user' ]), SetCustomerCacheInterceptor)
  @ApiOperation({ title: '测试接口，根据用户名获取用户数据' })
  @ApiImplicitHeader({ name: 'cookie' })
  @ApiOkResponse({
    type: GetUserInfoByUsernameResponseDto,
    isArray: true,
    description: '用户数据'
  })
  // param和query多的时候也可以使用dto进行承载和验证
  getUserInfoByUsername(@Query('name', QueryParamRequiredValidatePipe) name: string): Promise<TestEntity[]> {
    return this.testService.getUserInfoByUsername(name);
  }

  @Post('/postMoment')
  @HttpCode(200)
  @UseInterceptors(new CacheRelatedModelInterceptor([ 'test', 'user' ]), DelCustomerCacheInterceptor)
  @ApiOperation({ title: '测试接口，发布带图片的状态' })
  @ApiImplicitHeader({ name: 'cookie' })
  postMoment(
    @Body() postMomentData: PostMomentRequestDto, 
    @Session() session: ExpressSessionWithUserInfoInterface
  ): Promise<null> {
    return this.testService.postMoment(postMomentData, session.userInfo.unionId);
  }
}