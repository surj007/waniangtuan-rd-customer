export interface UploadFileToOssResponseDto {
  readonly name: string;
  readonly res: object;
}

export interface CopyFileOnOssResponseDto {
  readonly data: object;
  readonly res: object;
}

export interface CustomerCopyFileOnOssResponseDto {
  readonly data: object;
  readonly res: {
    readonly requestUrls: string[];
  };
}