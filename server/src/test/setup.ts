import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

declare global {
  var generateId: () => string;
}

let mongo: any;

beforeAll(async () => {

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.generateId = () => {
  return new mongoose.Types.ObjectId().toHexString();
};
