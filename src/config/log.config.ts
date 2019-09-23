// 日志等级 trace、debug、info、warn、error、fatal、mark
import * as log4js from 'log4js';

import envConfig from '../config/env.config';

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
    default: envConfig.defaultLog4jsCategories
  },
  pm2: true
});

(<any>global).console = log4js.getLogger();