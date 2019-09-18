import { Document } from 'mongoose';

export interface TestEntity extends Document {
  readonly name: string;
  readonly age: number;
}