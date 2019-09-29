import { Schema } from 'mongoose';

export const TestModel = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true
    },
    age: {
      type: Number,
      require: true
    },
    content: {
      type: String,
      default: ''
    },
    images: {
      type: [ String ],
      default: []
    }
  },
  { 
    collection: 'test' 
  }
);