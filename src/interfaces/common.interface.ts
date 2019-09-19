import { WxLocationInterface } from './wx.interface';

export interface LoginUserInfoInterface {
  unionId: string;
  openId: string;
  loginCode: string;
  iv: string;
  sessionKey : string;
  nickName: string;
  avatarUrl: string;
  gender: number;
  country: string;
  province: string;
  city: string;
  locationInfo: WxLocationInterface;
}