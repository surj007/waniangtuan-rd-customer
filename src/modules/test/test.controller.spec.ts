import { Test } from '@nestjs/testing';

import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestDao } from './test.dao';
import { AppModule } from '../app.module';
import { TestEntity } from '../../entities/test.entity';

describe('test TestModule', () => {
  let testController: TestController;
  let testService: TestService;
  let testDao: TestDao;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
      controllers: [ TestController ],
      providers: [ TestService, TestDao ],
    }).compile();

    testController = module.get<TestController>(TestController);
    testService = module.get<TestService>(TestService);
    testDao = module.get<TestDao>(TestDao);
  });

  describe('test getUserInfoByUsername', () => {
    const expectDaoResult: TestEntity[] = [{
      name: 'srj',
      age: 25,
      content: '123',
      images: [
        "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/nbxeh13a7il156899141650722.jpg", 
        "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/u7c8nl24sgh156899139828333.png"
      ]
    }];
    const expectServiceResult: TestEntity[] = [{
      name: 'srj',
      age: 25,
      content: '123',
      images: [
        "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/nbxeh13a7il156899141650722.jpg", 
        "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/u7c8nl24sgh156899139828333.png"
      ]
    }];
    const expectControllerResult: TestEntity[] = [{
      name: 'srj',
      age: 25,
      content: '123',
      images: [
        "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/nbxeh13a7il156899141650722.jpg", 
        "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/u7c8nl24sgh156899139828333.png"
      ]
    }];

    it('test getUserInfoByUsername dao', async () => {
      const result: TestEntity[] = await testDao.getUserInfoByUsername('srj');
      
      expect(result).toStrictEqual(expectDaoResult);
    });

    it('test getUserInfoByUsername service', async () => {
      jest.spyOn(testDao, 'getUserInfoByUsername').mockImplementation(() => Promise.resolve(expectDaoResult));

      const result: TestEntity[] = await testService.getUserInfoByUsername('srj');

      expect(result).toStrictEqual(expectServiceResult);
    });

    it('test getUserInfoByUsername controller', async () => {
      jest.spyOn(testService, 'getUserInfoByUsername').mockImplementation(() => Promise.resolve(expectServiceResult));

      const result: TestEntity[] = await testController.getUserInfoByUsername('srj');

      expect(result).toStrictEqual(expectControllerResult);
    });
  });
});