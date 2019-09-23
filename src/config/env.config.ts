import { Logger } from '@nestjs/common';

import { EnvConfigInterface } from '../interfaces/config.interface';

const envConfig: EnvConfigInterface = {
  dev: {
    port: 8000,
    defaultLog4jsCategories: {
      appenders: [ 'stdout' ],
      level: 'info',
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
    appLogger: new Logger()
  },
  'pre-test': {
    port: 8999,
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
    appLogger: false
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
    appLogger: false
  }
}

export default envConfig[<'dev' | 'pre-test' | 'prod'>`${process.env.NODE_ENV}`]