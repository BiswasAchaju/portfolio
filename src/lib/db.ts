import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();
db.$connect()
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((error: Error) => {
    console.error("Database connection failed:", error.message);
  });

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
