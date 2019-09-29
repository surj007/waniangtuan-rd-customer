import { readFileSync } from 'fs';
import { join } from 'path';

import { 
  EnvConfigInterface, HttpsOptionsInterface
} from '../interfaces/config.interface';

const httpsOptions: HttpsOptionsInterface = {
  key: readFileSync(join(__dirname, '../../static/ssl/www.waniangt.com.key')),
  cert: readFileSync(join(__dirname, '../../static/ssl/www.waniangt.com.pem'))
};

const envConfig: EnvConfigInterface = {
  dev: {
    port: 8000,
    defaultLog4jsCategories: {
      appenders: [ 'stdout' ],
      level: 'debug',
      enableCallStack: true
    },
    mongodb: {
      info: {
        username: '',
        password: '',
        uri: 'localhost:27017',
        database: 'waniangtuan'
      },
      opt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    },
    serverOptions: {}
  },
  'pre-test': {
    port: 8999,
    defaultLog4jsCategories: {
      appenders: [ 'dateLog' ],
      level: 'debug',
      enableCallStack: true
    },
    mongodb: {
      info: {
        username: 'root',
        password: 'Aa12345!',
        uri: 'dds-8vb36d53188005341.mongodb.zhangbei.rds.aliyuncs.com:3717,dds-8vb36d53188005342.mongodb.zhangbei.rds.aliyuncs.com:3717',
        database: 'waniangtuan'
      },
      opt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        replicaSet: 'mgset-500120530'
      }
    },
    serverOptions: {
      http2: true,
      httpsOptions
    }
  },
  prod: {
    port: 8000,
    defaultLog4jsCategories: {
      appenders: [ 'dateLog' ],
      level: 'warn',
      enableCallStack: true
    },
    mongodb: {
      info: {
        username: 'root',
        password: 'Aa12345!',
        uri: 'dds-8vb36d53188005341.mongodb.zhangbei.rds.aliyuncs.com:3717,dds-8vb36d53188005342.mongodb.zhangbei.rds.aliyuncs.com:3717',
        database: 'waniangtuan'
      },
      opt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        replicaSet: 'mgset-500120530'
      }
    },
    serverOptions: {
      http2: true,
      httpsOptions,
      logger: false
    }
  }
}

export default envConfig[<'dev' | 'pre-test' | 'prod'>`${process.env.NODE_ENV}`]