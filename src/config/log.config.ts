// 日志等级 trace、debug、info、warn、error、fatal、mark
import * as log4js from 'log4js';

import { Log4jsCategoriesInterface } from '../interfaces/config.interface';

let defaultLog4jsCategoriesInterface: Log4jsCategoriesInterface = <Log4jsCategoriesInterface>{};

if (process.env.NODE_ENV === 'dev') {
  defaultLog4jsCategoriesInterface = {
    appenders: [ 'stdout' ],
    level: 'info',
    enableCallStack: true
  };
}
else {
  defaultLog4jsCategoriesInterface = {
    appenders: [ 'dateLog' ],
    level: 'warn',
    enableCallStack: true
  };
}

log4js.configure({
  appenders: {
    dateLog: { 
      type: 'dateFile', 
      filename: './log/rd-customer',
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '[%d] [%p] [%f] [line%l] - %m'
      }
    },
    stdout: { 
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d] [%p] [%f] [line%l] - %m'
      }
    }
  },
  categories: {
    default: defaultLog4jsCategoriesInterface
  },
  pm2: true
});

(<any>global).console = log4js.getLogger();