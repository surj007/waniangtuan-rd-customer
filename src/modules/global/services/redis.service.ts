import { Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';

import { redisClient } from '../../../config/redis.config';

@Injectable()
export class RedisService {
  private readonly redisClient: RedisClient = redisClient;

  constructor() {
    this.setStringIfNotExist('data:doll:currentDollId:string', '10001').catch(err => {
      console.error('[srj] redis init set current doll id err: ', err);
    });
  }

  getRedisClient(): RedisClient {
    return this.redisClient;
  }

  setSet(key: string, members: string[]): Promise<number> {
    const redisClient: RedisClient = this.getRedisClient();

    return new Promise((resolve, reject) => {
      redisClient.sadd(key, members, (err, result) => {
        if (err !== null) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  getAllSetMembers(key: string): Promise<string[]> {
    const redisClient: RedisClient = this.getRedisClient();

    return new Promise((resolve, reject) => {
      redisClient.smembers(key, (err, results) => {
        if (err !== null) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  delSetMembers(key: string, members: string[]): Promise<number> {
    const redisClient: RedisClient = this.getRedisClient();

    return new Promise((resolve, reject) => {
      redisClient.srem(key, members, (err, results) => {
        if (err !== null) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  getString(key: string): Promise<string> {
    const redisClient: RedisClient = this.getRedisClient();

    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, result) => {
        if (err !== null) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  setStringIfNotExist(key: string, data: string): Promise<'OK'> {
    const redisClient: RedisClient = this.getRedisClient();

    return new Promise((resolve, reject) => {
      redisClient.set(key, data, 'NX', (err, result) => {
        if (err !== null) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  delByKeys(keys: string[]): Promise<number> {
    const redisClient: RedisClient = this.getRedisClient();

    return new Promise((resolve, reject) => {
      redisClient.del(keys, (err, result) => {
        if (err !== null) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  incrString(key: string): Promise<number> {
    const redisClient: RedisClient = this.getRedisClient();

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