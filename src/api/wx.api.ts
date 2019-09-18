import { Injectable, HttpService } from '@nestjs/common';

import { 
  WxOpenIdAndSessionKeyReqIntreface,
  WxOpenIdAndSessionKeyResIntreface
} from '../interfaces/wx.interface';

@Injectable()
export class WxApi {
  constructor(private readonly httpService: HttpService) {}

  getOpenIdAndSessionKeyByLoginCode(
    params: WxOpenIdAndSessionKeyReqIntreface
  ): Promise<WxOpenIdAndSessionKeyResIntreface> {
    return this.httpService.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      method: 'GET',
      params: {
        ...params,
        grant_type: 'authorization_code'
      }
    }).toPromise().then(res => res.data);
  }
}