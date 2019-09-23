import { RedisClient, createClient } from 'redis';

import { RedisDbEnum } from '../enum/config.enum';

export const redisSessionDbClient: RedisClient = createClient({
  host: '127.0.0.1',
  port: 6379,
  db: RedisDbEnum.SessionDb
});

export const redisCacheDbClient: RedisClient = createClient({
  host: '127.0.0.1',
  port: 6379,
  db: RedisDbEnum.CacheDb
});

export const redisCustomerDbClient: RedisClient = createClient({
  host: '127.0.0.1',
  port: 6379,
  db: RedisDbEnum.CustomerDb
});

function listenRedisEvent(redisClient: RedisClient, db: RedisDbEnum): void {
  redisClient.on('ready', (err) => {
    if (err !== undefined) {        
      console.error(`[srj] connect redis db ${db} err: `, err);
    }
    else {
      console.debug(`[srj] connect redis db ${db} success`);
    }
  });
  
  redisClient.on('error', (err) => {
    console.error(`[srj] redis db ${db} err: `, err);
  });
}

listenRedisEvent(redisSessionDbClient, RedisDbEnum.SessionDb);
listenRedisEvent(redisCacheDbClient, RedisDbEnum.CacheDb);
listenRedisEvent(redisCustomerDbClient, RedisDbEnum.CustomerDb);