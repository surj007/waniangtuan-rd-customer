import { Injectable } from '@nestjs/common';

import { TestEntity } from '../../entities/test.entity';
import { DbErrException } from '../../exceptions/internal-server-error.exception';
import { TestDao } from './test.dao';

@Injectable()
export class TestService {
  constructor(private readonly testDao: TestDao) {}

  async findByName(name: string): Promise<TestEntity[]> {
    try {
      return await this.testDao.findByName(name);
    }
    catch(err) {
      console.error('[srj] db err: ', err);

      throw new DbErrException();
    }
  }
}