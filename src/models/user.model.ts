import { Schema } from 'mongoose';

export const UserModel = new Schema(
  {
    // 小程序unionId
    unionId: {
      type: String,
      unique: true,
      required: true 
    },
    // 小程序openId
    openId: {
      type: String,
      unique: true,
      required: true 
    },
    // 小程序当前登陆code
    loginCode: {
      type: String,
      required: true 
    },
    // 小程序当前登陆iv
    iv: {
      type: String,
      required: true 
    },
    // 小程序当前登陆session_key
    sessionKey : {
      type: String,
      required: true 
    },

    // 用户昵称
    nickName: {
      type: String,
      required: true 
    },
    // 用户头像url
    avatarUrl: {
      type: String,
      required: true 
    },
    // 用户性别
    gender: {
      type: Number,
      required: true 
    },
    // 用户所在国家
    country: String,
    // 用户所在省份
    province: String,
    // 用户所在城市
    city: String,
    // 用户当前位置
    locationInfo: {
      type: {
        // 纬度，范围为 -90~90，负数表示南纬
        latitude: Number,
        // 经度，范围为 -180~180，负数表示西经
        longitude: Number,
        // 速度，单位 m/s
        speed: Number,
        // 位置的精确度
        accuracy: Number,
        // 水平精度，单位 m
        horizontalAccuracy: Number,
        // 垂直精度，单位 m（Android 无法获取，返回 0）
        verticalAccuracy: Number
      },
      default: {}
    },

    // 用户获得点赞数
    like: {
      type: Number,
      default: 0 
    },
    // 用户拥有的奶粉钱
    powderedMilk: {
      type: Number,
      default: 0
    },

    // 用户拥有的娃娃id
    doorIds: {
      type: [ Number ],
      default: []
    },
    // 用户收藏的文章id
    collectPaperIds: {
      type: [ Number ],
      default: []
    },
    // 用户发布的状态id
    stateIds: {
      type: [ Number ],
      default: []
    },
    // 用户关注的用户id
    focusUserIds: {
      type: [ Number ],
      default: []
    }
  },
  { 
    // 表名
    collection: 'user',
    timestamps: {
      // 当前表项创建时间
      createdAt: 'createTime',
      // 当前表项更新时间
      updatedAt: 'updateTime'
    },
    versionKey: false
  }
);