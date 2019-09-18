import { Document } from 'mongoose';

import { WxLocationInterface } from '../interfaces/user.interface';

export interface UserEntity extends Document {
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
  location: WxLocationInterface;
  like: number;
  powderedMilk: number;
  doorIds: number[];
  collectPaperIds: number[];
  stateIds: number[];
  focusUserIds: number[];
  createTime: number;
  updateTime: number;
}