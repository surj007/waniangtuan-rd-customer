import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiUseTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { createSuccessCommonRes } from '../../utils/response.util';
import { CommonResDto } from '../../dto/commonRes.dto';
import { UserInfoRequestDto } from './auth.dto';

@Controller('/auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @method 用户登陆接口
   * @author surongjian
   * @time   2019.09.17
   * @params UserInfoRequestDto
   * @return set-cookie
   */
  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ title: '用户登陆' })
  @ApiOkResponse({
    description: '登陆成功会在header中返回set-cookie'
  })
  async login(@Body() userInfo: UserInfoRequestDto): Promise<CommonResDto<null>> {
    return createSuccessCommonRes<null>(
      await this.authService.login(userInfo)
    );
  }
}
