import * as redis from 'redis';

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

redisClient.on('ready', (err) => {
  if (err) {        
    console.error('[srj] connect redis err: ', err);

    return;
  }

  console.debug('[srj] connect redis success');
});

redisClient.on('error', (err) => {
  console.error('[srj] redis err: ', err);
});

(<any>global).redisClient = redisClient;