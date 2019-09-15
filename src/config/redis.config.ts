import * as redis from 'redis';

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

redisClient.on('ready', (err) => {
  if (err) {        
    console.error('[srj][redis.config.js]connect redis err: ', err);

    return;
  }

  console.log('[srj][redis.config.js]connect redis success');
});

redisClient.on('error', (err) => {
  console.error('[srj][redis.config.js]redis err: ', err);
});

(<any>global).redisClient = redisClient;