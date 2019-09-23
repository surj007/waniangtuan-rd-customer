import { Module, Global, HttpModule, DynamicModule, CacheModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import * as cacheManagerRedisStore from 'cache-manager-redis-store';

import { WxApi } from '../../api/wx.api';
import { UserModel } from '../../models/user.model';
import { TestModel } from '../../models/test.model';
import { DollModel } from '../../models/doll.model';
import { RedisService } from './services/redis.service';
import { OssService } from './services/oss.service';
import { RedisDbEnum } from '../../enum/config.enum';
import { TerminusOptionsService } from './services/terminus-options.service';

const UserModelModule: DynamicModule = MongooseModule.forFeature([{ 
  name: 'user', 
  schema: UserModel 
}]);
const DollModelModule: DynamicModule = MongooseModule.forFeature([{ 
  name: 'doll', 
  schema: DollModel 
}]);
const TestModelModule: DynamicModule = MongooseModule.forFeature([{ 
  name: 'test', 
  schema: TestModel 
}]);

@Global()
@Module({
  imports: [ 
    HttpModule, 
    UserModelModule,
    TestModelModule,
    DollModelModule,
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService
    }),
    CacheModule.register({
      store: cacheManagerRedisStore,
      host: 'localhost',
      port: 6379,
      db: RedisDbEnum.CacheDb,
      ttl: 5 * 60,
      max: 200
    })
  ],
  controllers: [],
  providers: [ 
    RedisService, 
    WxApi, 
    OssService
  ],
  exports: [
    UserModelModule,
    TestModelModule,
    DollModelModule,
    RedisService,
    WxApi,
    OssService,
    CacheModule
  ]
})
export class GlobalModule {}