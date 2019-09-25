import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TestEntity, TestEntityWithMongooseDocument } from '../../entities/test.entity';
import { UpdateSuccessResultInterface } from '../../interfaces/mongoose.interface';
import { PostMomentRequestDto } from './test.dto';

@Injectable()
export class TestDao {
  constructor(@InjectModel('test') private readonly testModel: Model<TestEntityWithMongooseDocument>) {}

  getUserInfoByUsername(name: string): Promise<TestEntity[]> {
    return this.testModel.find({ name }, '-_id').lean().exec();
  }

  postMoment(postMomentData: PostMomentRequestDto): Promise<UpdateSuccessResultInterface> {
    return this.testModel.updateOne({ name: 'srj' }, postMomentData).exec();
  }
}