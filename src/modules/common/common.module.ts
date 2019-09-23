import { Module } from "@nestjs/common";

import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [],
  exports: [],
  controllers: [ CommonController ],
  providers: [ CommonService ]
})
export class CommonModule {}