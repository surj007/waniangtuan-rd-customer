export enum ResponseCodeEnum {
  Success,
  DbErr,
  ApiError,
  UnhandleException,
  Unauthorized,
  // request格式错误
  InvalidPayload,
  InvalidUploadFile,
  InvalidWxSignature
}