import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

import { AppModule } from '../src/modules/app.module';
import { setAppGlobalComponent } from '../src/main';

describe('test TestModule url', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;
  const prefixUrl: string = '/api/test'

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    app = moduleFixture.createNestApplication();
    request = supertest(app.getHttpServer());

    setAppGlobalComponent(app);

    await app.init();
  });

  it('test getUserInfoByUsername', () => {
    return request
      .get(prefixUrl + '/getUserInfoByUsername')
      .query({ name: 'srj' })
      .set('Cookie', 'connect.sid=s%3A0ps19lkfBkY6Iqv8fHlnltnd9G6YKXlk.OdOj%2BcU8VndWEcZLAq0ySkpJAQC8dyvpQDHWy%2BkOylU; Path=/; Expires=Sun, 20 Oct 2019 14:23:51 GMT; HttpOnly')
      .expect(200, {
        code: 0,
        message: 'ok',
        data: [{
          name: 'srj',
          age: 25,
          content: '123',
          images: [
            "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/nbxeh13a7il156899141650722.jpg", 
            "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/u7c8nl24sgh156899139828333.png"
          ]
        }]
      });
  });
});
