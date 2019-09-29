import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressSession from 'express-session';
import * as connectRedis from 'connect-redis';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as spdy from 'spdy';
import * as http from 'http';
import * as https from 'https';
// import * as csurf from 'csurf';

import { AppModule } from './modules/app.module';
import { ExtendSessionExpireInterceptor } from './interceptors/extend-session-expire.interceptor';
import { SuccessResponseWrapInterceptor } from './interceptors/success-response-wrap.interceptor';
import { AllExceptionFilter } from './exceptions/all-exception.filter';
import { DbErrExceptionFilter } from './exceptions/db-err-exception.filter';
import { ApiErrExceptionFilter } from './exceptions/api-err-exception.filter';
import { CustomGlobalInterface } from './interfaces/common.interface';
import { CustomNestApplicationOptions, HttpsOptionsInterface } from './interfaces/config.interface';
import { redisClient } from './config/redis.config';
import envConfig from './config/env.config';
import './config/log.config';

const redisStore: connectRedis.RedisStore = connectRedis(expressSession);

class CustomExpressAdapter extends ExpressAdapter {
  public initHttpServer(options: CustomNestApplicationOptions) {
    const isHttp2Enabled: boolean | undefined = options && options.httpsOptions && options.http2;
    const isHttpsEnabled: HttpsOptionsInterface | undefined = options && options.httpsOptions;

    if(isHttp2Enabled) {
      this.httpServer = spdy.createServer(<HttpsOptionsInterface>(options.httpsOptions), this.getInstance());
    }
    else if(isHttpsEnabled) {
      this.httpServer = https.createServer(<HttpsOptionsInterface>(options.httpsOptions), this.getInstance());
    }
    else {
      this.httpServer = http.createServer(this.getInstance());
    }
  }
}

export function setAppGlobalComponent(app: INestApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.use(expressSession({
    secret: 'waniangtuan-secret',
    cookie: {
      // 1天
      maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false,
    store: new redisStore({ client: redisClient })
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
  app.useGlobalInterceptors(new SuccessResponseWrapInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalFilters(new DbErrExceptionFilter());
  app.useGlobalFilters(new ApiErrExceptionFilter());
  app.setGlobalPrefix('api');
}

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, new CustomExpressAdapter(), envConfig.serverOptions);
  
  setAppGlobalComponent(app);

  SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('waniangtuan-miniprogram-api')
    .setVersion('0.1')
    .setSchemes('http', 'https')
    .build()
  ));

  await app.listen(envConfig.port, () => {
    (<CustomGlobalInterface>global).app = app;

    console.warn(`[srj] listen ${envConfig.port}...`);
  });
}

bootstrap();

process.on('uncaughtException', (err) => {
  console.error('[srj] uncaughtException: ', err);
});