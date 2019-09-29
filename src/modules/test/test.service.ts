import { Injectable } from '@nestjs/common';

import { TestEntity } from '../../entities/test.entity';
import { 
  DbErrException,
  ApiErrException 
} from '../../exceptions/internal-server-error.exception';
import { TestDao } from './test.dao';
import { OssService } from '../global/services/oss.service';
import { CopyFileOnOssResponseDto } from '../../dto/oss.dto';
import { CustomCopyFileOnOssResponseDto } from '../../dto/oss.dto';
import { PostMomentRequestDto } from './test.dto';

@Injectable()
export class TestService {
  constructor(
    private readonly testDao: TestDao,
    private readonly ossService: OssService
  ) {}

  async getUserInfoByUsername(name: string): Promise<TestEntity[]> {
    try {
      return await this.testDao.getUserInfoByUsername(name);
    }
    catch(err) {
      throw new DbErrException(err, 'mongodb');
    }
  }

  async postMoment(
    postMomentData: PostMomentRequestDto,
    userUnionId: string
  ): Promise<null> {
    let promiseArray: Promise<CopyFileOnOssResponseDto>[] = [];

    for (let i of postMomentData.images) {
      promiseArray.push(this.ossService.moveFileToStorage(i, userUnionId));
    }

    try {
      const copyFileOnOssResponseArray: CopyFileOnOssResponseDto[] = await Promise.all(promiseArray);

      try {
        await this.testDao.postMoment({
          content: postMomentData.content,
          images: copyFileOnOssResponseArray.map(copyFileOnOssResponse => (<CustomCopyFileOnOssResponseDto>copyFileOnOssResponse).res.requestUrls[0]),
        });

        return null;
      }
      catch(err) {
        throw new DbErrException(err, 'mongodb');
      }
    }
    catch(err) {
      throw new ApiErrException('oss api move file to storage err', err);
    }
  }
}