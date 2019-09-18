import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserEntity } from '../../entities/user.entity';
import { LoginUserInfoInterface } from './auth.interface';

@Injectable()
export class AuthDao {
  constructor(@InjectModel('user') private readonly userModel: Model<UserEntity>) {}

  login(loginUserInfo: LoginUserInfoInterface): Promise<UserEntity[]> {
    return this.userModel.find({ name: 1 }).exec();
  }
}