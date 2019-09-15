import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as expressSession from 'express-session';
import * as connectRedis from 'connect-redis';

import { HttpsOptionsInterface } from './interfaces/config.interface';
import { AppModule } from './modules/app.module';
import { SetRequestIdInterceptor } from './interceptors/set-request-id.interceptor';
import './config/redis.config';

let port: number = -1;
const redisStore: connectRedis.RedisStore = connectRedis(expressSession);
const httpsOptions: HttpsOptionsInterface = {
  key: readFileSync(join(__dirname, '../static/ssl/www.waniangt.com.key')),
  cert: readFileSync(join(__dirname, '../static/ssl/www.waniangt.com.pem'))
};

if (process.env.NODE_ENV == 'pre-test') {
  port = 8001;
}
else {
  port = 8000;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.use(expressSession({
    secret: 'waniangtuan-secret',
    cookie: {
      // 30天
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false,
    store: new redisStore({ client: (<any>global).redisClient })
  }));

  app.useGlobalInterceptors(new SetRequestIdInterceptor());

  await app.listen(port);
}

bootstrap();

process.on('uncaughtException', (err: Error): void => {
  console.error('[srj][main.ts]uncaughtException: ', err);
});