import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TestEntity } from '../../entities/test.entity';

@Injectable()
export class TestDao {
  constructor(@InjectModel('test') private readonly testModel: Model<TestEntity>) {}

  findByName(name: string): Promise<TestEntity[]> {
    return this.testModel.find({ name }, '-_id').exec();
  }
}