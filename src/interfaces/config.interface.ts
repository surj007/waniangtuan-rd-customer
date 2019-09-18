export interface DbOptInterface {
  readonly poolSize?: number;
  readonly replicaSet?: string;
  readonly useNewUrlParser: true;
  readonly useUnifiedTopology: true;
}

export interface DbConfigInterface {
  readonly username: string;
  readonly password: string;
  readonly uri: string;
  readonly database: string;
}

export interface HttpsOptionsInterface { 
  readonly key: Buffer;
  readonly cert: Buffer;
}

export interface Log4jsCategoriesInterface { 
  appenders: string[];
  level: string;
  enableCallStack?: boolean;
}