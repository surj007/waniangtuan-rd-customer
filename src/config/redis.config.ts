import { RedisClient, createClient } from 'redis';

export const redisClient: RedisClient = createClient({
  host: '127.0.0.1',
  port: 6379
});

redisClient.on('ready', (err) => {
  if (err !== undefined) {        
    console.error(`[srj] connect redis err: `, err);
  }
  else {
    console.debug(`[srj] connect redis success`);
  }
});

redisClient.on('error', (err) => {
  console.error(`[srj] redis err: `, err);
});