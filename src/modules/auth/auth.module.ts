import { Module,  } from "@nestjs/common";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDao } from './auth.dao';

@Module({
  imports: [],
  exports: [],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthDao ]
})
export class AuthModule {}