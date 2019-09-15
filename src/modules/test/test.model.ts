import { Schema } from 'mongoose';

export const TestModel = new Schema(
  {
    name: String,
    age: Number
  },
  { 
    collection: 'test', 
    versionKey: false 
  }
);