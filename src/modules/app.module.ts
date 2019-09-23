import { 
  Module, 
  NestModule, 
  MiddlewareConsumer, 
  RequestMethod
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { GlobalModule } from './global/global.module';
import { SetRequestIdMiddleware } from '../middlewares/set-request-id.middleware';
import envConfig from '../config/env.config';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${envConfig.mongodb.info.username}:${envConfig.mongodb.info.password}@${envConfig.mongodb.info.uri}/${envConfig.mongodb.info.database}`, 
      envConfig.mongodb.opt
    ),
    GlobalModule,
    TestModule,
    AuthModule,
    CommonModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetRequestIdMiddleware).forRoutes({ 
      path: '*', method: RequestMethod.ALL
    });
  }
}