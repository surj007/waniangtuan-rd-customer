import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { 
  UserEntityWithMongooseDocument
} from '../../entities/user.entity';
import { LoginUserInfoInterface } from '../../interfaces/common.interface';
import { UpdateSuccessResultInterface } from '../../interfaces/mongoose.interface';
import { DbErrException } from '../../exceptions/internal-server-error.exception';

@Injectable()
export class AuthDao {
  // Model中能获取到db connnection handle
  constructor(@InjectModel('user') private readonly userModel: Model<UserEntityWithMongooseDocument>) {}

  async login(loginUserInfo: LoginUserInfoInterface): Promise<UpdateSuccessResultInterface> {
    try {
      return await this.userModel.updateOne(
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
    catch(err) {
      throw new DbErrException(err, 'mongodb');
    }
  }
}