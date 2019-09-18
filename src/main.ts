import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as expressSession from 'express-session';
import * as connectRedis from 'connect-redis';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';

import { HttpsOptionsInterface } from './interfaces/config.interface';
import { AppModule } from './modules/app.module';
import { ExtendSessionExpireInterceptor } from './interceptors/extend-session-expire.interceptor';
import './config/redis.config';
import './config/log.config';

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
  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });

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
  app.use(compression());
  app.use(helmet());
  // app.use(csurf());
  app.use(new rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: '访问次数过多，请15分钟后重试'
  }));

  app.useGlobalInterceptors(new ExtendSessionExpireInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('waniangtuan-miniprogram-api')
    .setVersion('0.1')
    .setSchemes('https')
    .build()
  ));

  await app.listen(port, () => {
    console.warn('[srj] listen 8000...');
  });
}

bootstrap();

process.on('uncaughtException', (err: Error): void => {
  console.error('[srj] uncaughtException: ', err);
});