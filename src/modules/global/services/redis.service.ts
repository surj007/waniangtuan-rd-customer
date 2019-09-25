import { Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';

import { 
  redisCacheDbClient, 
  redisCustomerDbClient
} from '../../../config/redis.config';
import { RedisDbEnum } from '../../../enum/config.enum';

@Injectable()
export class RedisService {
  private readonly redisCacheDbClient: RedisClient = redisCacheDbClient;
  private readonly redisCustomerDbClient: RedisClient = redisCustomerDbClient;

  constructor() {
    this.setStringIfNotExist('customer:currentDollId', '10001').catch(err => {
      console.error('[srj] redis init set current doll id err: ', err);
    });
  }

  getRedisClient(db: RedisDbEnum): RedisClient {
    switch (db) {
      case RedisDbEnum.CacheDb: {
        return this.redisCacheDbClient;
      }
      
      case RedisDbEnum.CustomerDb: {
        return this.redisCustomerDbClient;
      }
    
      default: {
        return this.redisCustomerDbClient;
      }
    }
  }

  getKeys(pattern: string, db: RedisDbEnum = RedisDbEnum.CustomerDb): Promise<string[]> {
    const redisClient: RedisClient = this.getRedisClient(db);

    return new Promise((resolve, reject) => {
      redisClient.keys(pattern, (err, results) => {
        if (err !== null) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  getString(key: string, db: RedisDbEnum = RedisDbEnum.CustomerDb): Promise<string> {
    const redisClient: RedisClient = this.getRedisClient(db);

    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, result) => {
        if (err !== null) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  setStringIfNotExist(key: string, data: string, db: RedisDbEnum = RedisDbEnum.CustomerDb): Promise<any> {
    const redisClient: RedisClient = this.getRedisClient(db);

    return new Promise((resolve, reject) => {
      redisClient.set(key, data, 'NX', (err, setResult) => {
        if (err !== null) {
          reject(err);
        }

        resolve(setResult);
      });
    });
  }

  del(keys: string[], db: RedisDbEnum = RedisDbEnum.CustomerDb): Promise<any> {
    const redisClient: RedisClient = this.getRedisClient(db);

    return new Promise((resolve, reject) => {
      redisClient.del(keys, (err, result) => {
        if (err !== null) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  incr(key: string, db: RedisDbEnum = RedisDbEnum.CustomerDb): Promise<number> {
    const redisClient: RedisClient = this.getRedisClient(db);

    return new Promise((resolve, reject) => {
      redisClient.incr(key, (err, result) => {
        if (err !== null) {
          reject(err);
        }

        resolve(result);
      });
    });
  }
}