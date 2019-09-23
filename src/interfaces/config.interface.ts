import { Logger } from '@nestjs/common';

interface DbOptInterface {
  readonly poolSize?: number;
  readonly replicaSet?: string;
  readonly useNewUrlParser: true;
  readonly useUnifiedTopology: true;
  readonly useCreateIndex: true;
}

interface DbInfoInterface {
  readonly username: string;
  readonly password: string;
  readonly uri: string;
  readonly database: string;
}

interface Log4jsCategoriesInterface { 
  readonly appenders: string[];
  readonly level: string;
  readonly enableCallStack?: boolean;
}

interface SingleEnvConfigInterface {
  readonly port: number;
  readonly defaultLog4jsCategories: Log4jsCategoriesInterface,
  readonly mongodb: {
    readonly info: DbInfoInterface,
    readonly opt: DbOptInterface
  },
  readonly appLogger: Logger | boolean;
}

export interface EnvConfigInterface { 
  readonly dev: SingleEnvConfigInterface;
  readonly 'pre-test': SingleEnvConfigInterface;
  readonly prod: SingleEnvConfigInterface;
}

export interface HttpsOptionsInterface { 
  readonly key: Buffer;
  readonly cert: Buffer;
}