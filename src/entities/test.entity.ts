import { Document } from 'mongoose';

export interface TestEntity extends Document {
  readonly name: string;
  readonly age: number;
  readonly content: string;
  readonly images: string[];
}