import { Document } from 'mongoose';

import { WxLocationInterface } from '../interfaces/wx.interface';

export interface UserEntity extends Document {
  readonly unionId: string;
  readonly openId: string;
  readonly loginCode: string;
  readonly iv: string;
  readonly sessionKey : string;
  readonly nickName: string;
  readonly avatarUrl: string;
  readonly gender: number;
  readonly country: string;
  readonly province: string;
  readonly city: string;
  readonly locationInfo: WxLocationInterface;
  readonly like: number;
  readonly powderedMilk: number;
  readonly dollIds: number[];
  readonly collectPaperIds: number[];
  readonly momentIds: number[];
  readonly focusUserIds: number[];
  readonly createTime: number;
  readonly updateTime: number;
}