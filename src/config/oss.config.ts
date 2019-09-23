import * as OSS from 'ali-oss';

import { 
  ALIYUN_OSS_BUCKET,
  ALIYUN_OSS_REGION,
  ALIYUN_KEY_ACCESSKEYID,
  ALIYUN_KEY_ACCESSKEYSECRET
} from '../utils/constants.util';

const ossClient: OSS = new OSS({
  region: ALIYUN_OSS_REGION,
  accessKeyId: ALIYUN_KEY_ACCESSKEYID,
  accessKeySecret: ALIYUN_KEY_ACCESSKEYSECRET,
  bucket: ALIYUN_OSS_BUCKET
});

export default ossClient