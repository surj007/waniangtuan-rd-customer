import { Injectable } from '@nestjs/common';

import { UserInfoRequestDto } from './auth.dto';
import { WxApi } from '../../api/wx.api';
import { WxDecryptData } from '../../interfaces/wx.interface';
import { WxOpenIdAndSessionKeyResponseDto } from '../../dto/wx.dto';
import { WX_APP_ID, WX_APP_SECRET } from '../../utils/constants.util';
import { AuthDao } from './auth.dao';
import { encrypt } from '../../utils/crypto.util';
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
    const openIdAndSessionKeyResponse: WxOpenIdAndSessionKeyResponseDto = await this.wxApi.getOpenIdAndSessionKeyByLoginCode({
      appid: WX_APP_ID,
      secret: WX_APP_SECRET,
      js_code: userInfo.loginCode
    });

    if (!this.validateWxSignature(userInfo.rawData, userInfo.signature, openIdAndSessionKeyResponse.session_key)) {
      throw new InvalidWxSignatureException();
    }

    const decryptData = this.decryptData(openIdAndSessionKeyResponse.session_key, userInfo.encryptedData, userInfo.iv);
    const loginUserInfo: LoginUserInfoInterface = {
      unionId: decryptData.unionId,
      openId: openIdAndSessionKeyResponse.openid,
      loginCode: userInfo.loginCode,
      iv: userInfo.iv,
      sessionKey : openIdAndSessionKeyResponse.session_key,
      locationInfo: userInfo.locationInfo,
      ...userInfo.userInfo
    };

    await this.authDao.login(loginUserInfo);

    return loginUserInfo;
  }
}