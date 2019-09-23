import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TestEntity } from '../../entities/test.entity';
import { UpdateSuccessResultInterface } from '../../interfaces/mongoose.interface';
import { PostMomentRequestDto } from './test.dto';

@Injectable()
export class TestDao {
  constructor(@InjectModel('test') private readonly testModel: Model<TestEntity>) {}

  getUserInfoByUsername(name: string): Promise<TestEntity[]> {
    return this.testModel.find({ name }, '-_id').exec();
  }

  postMoment(postMomentData: PostMomentRequestDto): Promise<UpdateSuccessResultInterface> {
    return this.testModel.updateOne({ name: 'srj' }, postMomentData).exec();
  }
}