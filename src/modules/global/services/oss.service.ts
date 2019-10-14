import { Injectable } from '@nestjs/common';

import ossClient from '../../../config/oss.config';
import { UploadFileInterface } from '../../../interfaces/common.interface';
import { 
  UploadFileToOssResponseDto, 
  CopyFileOnOssResponseDto 
} from '../../../dto/oss.dto';
import { getRandomString } from '../../../utils/common.util';
import { ApiErrException } from '../../../exceptions/internal-server-error.exception';

@Injectable()
export class OssService {
  async uploadFileToOssWithExpire(
    file: UploadFileInterface,
    userUnionId: string
  ): Promise<UploadFileToOssResponseDto> {
    try {
      return await ossClient.put(
        `miniprogram/image/tmp/${userUnionId}/${getRandomString()}${Date.now()}${file.originalname}`, 
        file.buffer
      );
    }
    catch(err) {
      throw new ApiErrException('oss api upload file err', err);
    }
  }

  signatureUrl(url: string): string {
    return ossClient.signatureUrl(url, {
      expires: 23 * 60 * 60,
      method: 'GET'
    });
  }

  async moveFileToStorage(filePath: string, userUnionId: string): Promise<CopyFileOnOssResponseDto> {
    if (filePath.indexOf(userUnionId) === -1) {
      return Promise.reject('invalid file with unionId');
    }

    const filePathArray = filePath.split(`${userUnionId}/`);

    try {
      return await ossClient.copy(
        `miniprogram/image/storage/${userUnionId}/${filePathArray[1]}`,
        `miniprogram/image/tmp/${userUnionId}/${filePathArray[1]}`
      );
    }
    catch(err) {
      throw new ApiErrException('oss api move file to storage err', err);
    }
  }
}