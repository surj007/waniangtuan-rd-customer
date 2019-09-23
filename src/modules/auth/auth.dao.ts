import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserEntity } from '../../entities/user.entity';
import { LoginUserInfoInterface } from '../../interfaces/common.interface';
import { UpdateSuccessResultInterface } from '../../interfaces/mongoose.interface';

@Injectable()
export class AuthDao {
  constructor(@InjectModel('user') private readonly userModel: Model<UserEntity>) {}

  login(loginUserInfo: LoginUserInfoInterface): Promise<UpdateSuccessResultInterface> {
    return this.userModel.updateOne(
      {
        unionId: loginUserInfo.unionId,
        openId: loginUserInfo.openId
      }, 
      loginUserInfo,
      { 
        upsert: true, 
        setDefaultsOnInsert: true 
      }
    ).exec();
  }
}