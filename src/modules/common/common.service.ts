import { Injectable } from '@nestjs/common';

import { OssService } from '../global/services/oss.service';
import { UploadFileInterface } from '../../interfaces/common.interface';
import { UploadFileToOssResponseDto } from '../../dto/oss.dto';
import { UploadFileResponseDto } from '../../dto/common.dto';

@Injectable()
export class CommonService {
  constructor(private readonly ossService: OssService) {}

  async uploadFile(
    file: UploadFileInterface,
    userUnionId: string
  ): Promise<UploadFileResponseDto> {
    const uploadFileToOssResponse: UploadFileToOssResponseDto = await this.ossService.uploadFileToOssWithExpire(file, userUnionId);

    return {
      fileTmpUrl: this.ossService.signatureUrl(uploadFileToOssResponse.name),
      fileTmpPath: uploadFileToOssResponse.name,
      fileSize: file.size,
      fileName: file.originalname
    };
  }
}