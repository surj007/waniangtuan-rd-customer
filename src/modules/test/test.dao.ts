import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TestEntity, TestEntityWithMongooseDocument } from '../../entities/test.entity';
import { UpdateSuccessResultInterface } from '../../interfaces/mongoose.interface';
import { PostMomentRequestDto } from './test.dto';
import { DbErrException } from '../../exceptions/internal-server-error.exception';

@Injectable()
export class TestDao {
  constructor(@InjectModel('test') private readonly testModel: Model<TestEntityWithMongooseDocument>) {}

  async getUserInfoByUsername(name: string): Promise<TestEntity[]> {
    try {
      return await this.testModel.find({ name }, '-_id').lean().exec();
    }
    catch(err) {
      throw new DbErrException(err, 'mongodb');
    }
  }

  async postMoment(postMomentData: PostMomentRequestDto): Promise<UpdateSuccessResultInterface> {
    try {
      return await this.testModel.updateOne({ name: 'srj' }, postMomentData).exec();
    }
    catch(err) {
      throw new DbErrException(err, 'mongodb');
    }
  }
}