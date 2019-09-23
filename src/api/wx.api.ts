import { Injectable, HttpService } from '@nestjs/common';

import { 
  WxOpenIdAndSessionKeyReqestDto,
  WxOpenIdAndSessionKeyResponseDto
} from '../dto/wx.dto';

@Injectable()
export class WxApi {
  constructor(private readonly httpService: HttpService) {}

  getOpenIdAndSessionKeyByLoginCode(
    params: WxOpenIdAndSessionKeyReqestDto
  ): Promise<WxOpenIdAndSessionKeyResponseDto> {
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