import { Injectable } from '@nestjs/common';

import { UserInfoRequestDto } from './auth.dto';
import { WxApi } from '../../api/wx.api';
import { WX_APP_ID, WX_APP_SECRET } from '../../utils/constants.util';
import { AuthDao } from './auth.dao';
import { validateWxSignature } from '../../utils/crypto.util';
import { WxApiErrException } from '../../exceptions/internal-server-error.exception';
import { InvalidWxSignatureException } from '../../exceptions/bad-request.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDao: AuthDao, 
    private readonly wxApi: WxApi
  ) {}

  async login(userInfo: UserInfoRequestDto): Promise<null> {
    try {
      let { session_key, openid } = await this.wxApi.getOpenIdAndSessionKeyByLoginCode({
        appid: WX_APP_ID,
        secret: WX_APP_SECRET,
        js_code: userInfo.loginCode
      });

      if (!validateWxSignature(userInfo.rawData, userInfo.signature, session_key)) {
        throw new InvalidWxSignatureException();
      };

      console.info(openid);
      this.authDao.login({});
      return Promise.resolve(null);
    }
    catch(err) {
      console.error('[srj] getOpenIdAndSessionKeyByLoginCode http err: ', err.toJSON());

      throw new WxApiErrException();
    }
  }
}