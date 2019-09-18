import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WxApi } from '../../api/wx.api';
import { AuthDao } from './auth.dao';
import { UserModel } from '../../models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserModel }]),
    HttpModule
  ],
  exports: [],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthDao, WxApi ]
})
export class AuthModule {}