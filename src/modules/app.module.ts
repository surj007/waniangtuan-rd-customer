import { 
  Module, 
  NestModule, 
  MiddlewareConsumer, 
  RequestMethod
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { dbUri, dbOpt } from '../config/db.config';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { SetRequestIdMiddleware } from '../middlewares/set-request-id.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(dbUri, dbOpt),
    TestModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetRequestIdMiddleware).forRoutes({ 
      path: '*', method: RequestMethod.ALL
    });
  }
}