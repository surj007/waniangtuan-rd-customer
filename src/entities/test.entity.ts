import { Document } from 'mongoose';

export interface TestEntity {
  readonly name: string;
  readonly age: number;
  readonly content: string;
  readonly images: string[];
}

export interface TestEntityWithMongooseDocument extends TestEntity, Document {}