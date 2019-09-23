import { Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';

import { redisCacheDbClient, redisCustomerDbClient } from '../../../config/redis.config';
import { RedisDbEnum } from '../../../enum/config.enum';

@Injectable()
export class RedisService {
  private readonly redisCacheDbClient: RedisClient = redisCacheDbClient;
  private readonly redisCustomerDbClient: RedisClient = redisCustomerDbClient;

  getRedisClient(db: RedisDbEnum): RedisClient | null {
    switch (db) {
      case RedisDbEnum.CacheDb: {
        return this.redisCacheDbClient;
      }
      
      case RedisDbEnum.CustomerDb: {
        return this.redisCustomerDbClient;
      }
    
      default: {
        return null;
      }
    }
  }

  getKeys(pattern: string, db: RedisDbEnum = RedisDbEnum.CustomerDb): Promise<string[]> {
    let redisClient: RedisClient = this.redisCustomerDbClient;

    if (db === RedisDbEnum.CacheDb) {
      redisClient = this.redisCacheDbClient
    }

    return new Promise((resolve, reject) => {
      redisClient.keys(pattern, (err, results) => {
        if (err !== null) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  del(keys: string[], db: RedisDbEnum = RedisDbEnum.CustomerDb): Promise<any> {
    let redisClient: RedisClient = this.redisCustomerDbClient;

    if (db === RedisDbEnum.CacheDb) {
      redisClient = this.redisCacheDbClient
    }

    return new Promise((resolve, reject) => {
      redisClient.del(keys, (err, results) => {
        if (err !== null) {
          reject(err);
        }

        resolve(results);
      });
    });
  }
}