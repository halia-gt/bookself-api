import pkg from "@prisma/client";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();


const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

const connection: pg.Pool = new Pool(databaseConfig);

export { prisma, connection };