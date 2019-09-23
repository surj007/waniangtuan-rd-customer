import { Controller, Post, Body, HttpCode, Session } from '@nestjs/common';
import { ApiUseTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserInfoRequestDto } from './auth.dto';
import { LoginUserInfoInterface } from '../../interfaces/common.interface';
import { ExpressSessionInterface } from '../../interfaces/express.interface';

@Controller('/auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ title: '用户登陆' })
  @ApiOkResponse({
    headers: { 
      'set-cookie': {
        type: 'string',
        description: '登陆成功会在header中返回set-cookie'
      } 
    }
  })
  async login(
    @Body() userInfo: UserInfoRequestDto,
    @Session() session: ExpressSessionInterface
  ): Promise<null> {
    const loginUserInfo: LoginUserInfoInterface = await this.authService.login(userInfo);

    session.userInfo = loginUserInfo;

    return null;
  }
}
