import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { dbUri, dbOpt } from '../config/db.config';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    MongooseModule.forRoot(dbUri, dbOpt),
    TestModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}