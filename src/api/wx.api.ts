import { Injectable, HttpService } from '@nestjs/common';

import { 
  WxOpenIdAndSessionKeyReqestDto,
  WxOpenIdAndSessionKeyResponseDto
} from '../dto/wx.dto';
import { ApiErrException } from '../exceptions/internal-server-error.exception';

@Injectable()
export class WxApi {
  constructor(private readonly httpService: HttpService) {}

  async getOpenIdAndSessionKeyByLoginCode(
    params: WxOpenIdAndSessionKeyReqestDto
  ): Promise<WxOpenIdAndSessionKeyResponseDto> {
    try {
      return await this.httpService.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        method: 'GET',
        params: {
          ...params,
          grant_type: 'authorization_code'
        }
      }).toPromise().then(res => { 
        if (res.data.errcode && res.data.errmsg) {
          throw new Error(res.data.errmsg);
        }

        return res.data;
      });
    }
    catch(err) {
      throw new ApiErrException('wx api get openId and sessionkey err', err);
    }
  }
}