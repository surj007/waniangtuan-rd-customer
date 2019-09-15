import { DbConfigInterface, DbOptInterface } from '../interfaces/config.interface';

let dbConfig: DbConfigInterface = <DbConfigInterface>{};
let dbOpt: DbOptInterface = <DbOptInterface>{
  useNewUrlParser: true,
  useUnifiedTopology: true
};
let dbUri: string = '';

if (process.env.NODE_ENV === 'dev') {
  dbConfig = {
    username: '',
    password: '',
    uri: 'localhost:27017',
    database: 'test'
  };
}
else {
  dbConfig = {
    username: 'root',
    password: 'Aa12345!',
    uri: 'dds-8vb36d53188005341.mongodb.zhangbei.rds.aliyuncs.com:3717,dds-8vb36d53188005342.mongodb.zhangbei.rds.aliyuncs.com:3717',
    database: 'waniangtuan'
  };

  dbOpt = {
    ...dbOpt,
    replicaSet: 'mgset-500120530'
  };
}

dbUri = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.uri}/${dbConfig.database}`;

export { dbUri, dbOpt }