import { 
  FILE_TYPE_PNG_CODE, 
  FILE_TYPE_GIF_CODE, 
  FILE_TYPE_JPG_CODE,
  VALID_FILE_SIZE
} from './constants.util';

export function isValidFileType(fileBuffer: Buffer): boolean {
  return fileBuffer.toString('hex', 0, 2) === FILE_TYPE_PNG_CODE ||
         fileBuffer.toString('hex', 0, 2) === FILE_TYPE_GIF_CODE ||
         fileBuffer.toString('hex', 0, 2) === FILE_TYPE_JPG_CODE
}

export function isValidFileSize(size: number): boolean {
  return size <= VALID_FILE_SIZE && size > 0;
}

// 11位
export function getRandomString(): string {
  return Math.random().toString(36).substr(2);
}

export function jsonClone<T, E>(data: T): E {
  return JSON.parse(JSON.stringify(data));
}