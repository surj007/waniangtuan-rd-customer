import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TestEntity } from './test.entity';

@Injectable()
export class TestService {
  constructor(@InjectModel('test') private readonly testModel: Model<TestEntity>) {}

  findByName(name: string): Promise<TestEntity[]> {
    return this.testModel.find({ name }).exec();
  }
}