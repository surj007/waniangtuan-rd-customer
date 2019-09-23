import { Test } from '@nestjs/testing';

import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestDao } from './test.dao';
import { AppModule } from '../app.module';

describe('test TestModule', () => {
  // let testController: TestController;
  // let testService: TestService;
  let testDao: TestDao;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
      controllers: [ TestController ],
      providers: [ TestService, TestDao ],
    }).compile();

    // testController = module.get<TestController>(TestController);
    // testService = module.get<TestService>(TestService);
    testDao = module.get<TestDao>(TestDao);
  });

  describe('test getUserInfoByUsername', () => {
    it('test getUserInfoByUsername dao', async () => {
      const result: object[] = JSON.parse(JSON.stringify(await testDao.getUserInfoByUsername('srj')));
      const expectResult: object[] = [{
        name: 'srj',
        age: 25,
        content: '123',
        images: [
          "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/nbxeh13a7il156899141650722.jpg", 
          "http://waniangtuan.oss-cn-zhangjiakou.aliyuncs.com/miniprogram/image/storage/oX0rWwbEIz8KK73Lqe0sngffaBhI/u7c8nl24sgh156899139828333.png"
        ]
      }];
      
      expect(result).toStrictEqual(expectResult);
    });

    // it('test getUserInfoByUsername dao', async () => {
    //   const result = ['test'];
    //   jest.spyOn(testDao, 'getUserInfoByUsername').mockImplementation(() => result);
    //   jest.spyOn(testService, 'getUserInfoByUsername').mockImplementation(() => result);

    //   expect(await catsController.findAll()).toBe(result);
    // });
  });
});