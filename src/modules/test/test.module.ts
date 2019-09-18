import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestDao } from './test.dao';
import { TestModel } from '../../models/test.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'test', schema: TestModel }])
  ],
  exports: [],
  controllers: [ TestController ],
  providers: [ TestService, TestDao ]
})
export class TestModule {}