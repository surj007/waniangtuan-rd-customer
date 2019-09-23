import { Module } from "@nestjs/common";

import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestDao } from './test.dao';

@Module({
  imports: [],
  exports: [],
  controllers: [ TestController ],
  providers: [ TestService, TestDao ]
})
export class TestModule {}