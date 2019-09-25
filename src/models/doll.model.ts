import { Schema } from 'mongoose';

import { RedisService } from '../modules/global/services/redis.service';
import { CustomGlobalInterface } from '../interfaces/common.interface';
import { DbErrException } from '../exceptions/internal-server-error.exception';

export const DollModel = new Schema(
  {
    // 娃娃id
    id: {
      type: Number,
      unique: true,
      required: true
    },
    // 私养名
    name: {
      type: String,
      required: true 
    },
    // 私养图
    avatarUrl: {
      type: String,
      unique: true,
      required: true 
    },
    // 生日
    birthday: {
      type: Date,
      required: true
    },
    // 兴趣
    interest: {
      type: String,
      required: true
    }
  },
  { 
    // 表名
    collection: 'doll',
    timestamps: {
      // 当前表项创建时间
      createdAt: 'createTime',
      // 当前表项更新时间
      updatedAt: 'updateTime'
    },
    versionKey: false
  }
);

DollModel.pre('save', async function(next) {
  const redisService: RedisService = (<CustomGlobalInterface>global).app.get(RedisService);
  let currentDollId: number;

  try {
    currentDollId = await redisService.incr('customer:currentDollId');
  }
  catch(err) {
    throw new DbErrException(err, 'redis');
  }

  this.id = currentDollId;

  next();
});