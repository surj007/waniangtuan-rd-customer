import { Injectable } from '@nestjs/common';

import ossClient from '../../../config/oss.config';
import { UploadFileInterface } from '../../../interfaces/common.interface';
import { 
  UploadFileToOssResponseDto, 
  CopyFileOnOssResponseDto 
} from '../../../dto/oss.dto';
import { getRandomString } from '../../../utils/common.util';

@Injectable()
export class OssService {
  uploadFileToOssWithExpire(
    file: UploadFileInterface,
    userUnionId: string
  ): Promise<UploadFileToOssResponseDto> {
    return ossClient.put(
      `miniprogram/image/tmp/${userUnionId}/${getRandomString()}${Date.now()}${file.originalname}`, 
      file.buffer
    );
  }

  signatureUrl(url: string): string {
    return ossClient.signatureUrl(url, {
      expires: 23 * 60 * 60,
      method: 'GET'
    });
  }

  moveFileToStorage(filePath: string, userUnionId: string): Promise<CopyFileOnOssResponseDto> {
    if (filePath.indexOf(userUnionId) === -1) {
      return Promise.reject('invalid file with unionId');
    }

    const filePathArray = filePath.split(`${userUnionId}/`);

    return ossClient.copy(
      `miniprogram/image/storage/${userUnionId}/${filePathArray[1]}`,
      `miniprogram/image/tmp/${userUnionId}/${filePathArray[1]}`
    );
  }
}