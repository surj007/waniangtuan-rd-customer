import { 
  Controller,
  UseGuards, 
  Post, 
  HttpCode, 
  UseInterceptors,
  UploadedFile,
  Session
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ApiUseTags, 
  ApiOkResponse, 
  ApiOperation, 
  ApiImplicitFile,
  ApiImplicitHeader,
  ApiConsumes 
} from '@nestjs/swagger';

import { CommonService } from './common.service';
import { UploadFileInterface } from '../../interfaces/common.interface';
import { UploadFileResponseDto } from '../../dto/common.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { FileValidateInterceptor } from '../../interceptors/file-validate.interceptor';
import { ExpressSessionWithUserInfoInterface } from '../../interfaces/express.interface';

@Controller('/common')
@ApiUseTags('common')
@UseGuards(AuthGuard)
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('/uploadFile')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'), FileValidateInterceptor)
  @ApiOperation({ title: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitHeader({ name: 'cookie' })
  @ApiImplicitFile({ name: 'file', required: true })
  @ApiOkResponse({
    type: UploadFileResponseDto,
    description: '上传的文件信息'
  })
  uploadFile(
    @UploadedFile() file: UploadFileInterface,
    @Session() session: ExpressSessionWithUserInfoInterface
  ): Promise<UploadFileResponseDto> {
    return this.commonService.uploadFile(file, session.userInfo.unionId);
  }
}