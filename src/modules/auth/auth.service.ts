import { Injectable } from '@nestjs/common';

import { UserInfoRequestDto } from './auth.dto';
import { WxApi } from '../../api/wx.api';
import { WxOpenIdAndSessionKeyResIntreface, WxDecryptData } from '../../interfaces/wx.interface';
import { WX_APP_ID, WX_APP_SECRET } from '../../utils/constants.util';
import { AuthDao } from './auth.dao';
import { encrypt } from '../../utils/crypto.util';
import { WxApiErrException, DbErrException } from '../../exceptions/internal-server-error.exception';
import { InvalidWxSignatureException } from '../../exceptions/bad-request.exception';
import { LoginUserInfoInterface } from '../../interfaces/common.interface';
import WXBizDataCrypt = require('../../libs/WXBizDataCrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly authDao: AuthDao, 
    private readonly wxApi: WxApi
  ) {}

  validateWxSignature(
    rawData: string, signature: string, sessionKey: string
  ): boolean {
    return signature === encrypt('sha1', rawData + sessionKey);
  }

  decryptData(sessionKey: string, encryptedData: string, iv: string): WxDecryptData {
    return new WXBizDataCrypt(WX_APP_ID, sessionKey).decryptData(encryptedData , iv);
  }

  async login(userInfo: UserInfoRequestDto): Promise<LoginUserInfoInterface> {
    delete userInfo.locationInfo.errMsg;
    let openIdAndSessionKeyRes: WxOpenIdAndSessionKeyResIntreface = <WxOpenIdAndSessionKeyResIntreface>{};

    try {
      openIdAndSessionKeyRes = await this.wxApi.getOpenIdAndSessionKeyByLoginCode({
        appid: WX_APP_ID,
        secret: WX_APP_SECRET,
        js_code: userInfo.loginCode
      });
    }
    catch(err) {
      console.error('[srj] getOpenIdAndSessionKeyByLoginCode http err: ', err);

      throw new WxApiErrException();
    }

    if (!this.validateWxSignature(userInfo.rawData, userInfo.signature, openIdAndSessionKeyRes.session_key)) {
      throw new InvalidWxSignatureException();
    }

    const decryptData = this.decryptData(openIdAndSessionKeyRes.session_key, userInfo.encryptedData, userInfo.iv);
    const loginUserInfo: LoginUserInfoInterface = {
      unionId: decryptData.unionId || 'aa',
      openId: openIdAndSessionKeyRes.openid,
      loginCode: userInfo.loginCode,
      iv: userInfo.iv,
      sessionKey : openIdAndSessionKeyRes.session_key,
      locationInfo: userInfo.locationInfo,
      ...userInfo.userInfo
    };

    try {
      await this.authDao.login(loginUserInfo);

      return Promise.resolve(loginUserInfo);
    }
    catch(err) {
      console.error('[srj] db err: ', err);

      throw new DbErrException();
    }
  }
}