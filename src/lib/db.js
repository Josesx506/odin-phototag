import { PrismaClient } from "@/generated/prisma";
import "dotenv/config";
import mongoose from "mongoose";

const connectPrisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = connectPrisma;



global.mongoose = {
  conn: null,
  promise: null,
};

async function connectMongoose() {
  if (global.mongoose && global.mongoose.conn) {
    console.log('prior db connection')
    return global.mongoose.conn;
  } else {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
    }
    const promise = mongoose.connect(DATABASE_URL, { autoIndex: true })

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log('new db connection');

    return await promise;
  }
}

export { connectMongoose, connectPrisma };
