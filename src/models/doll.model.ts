import { Schema } from 'mongoose';

export const DollModel = new Schema(
  {
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