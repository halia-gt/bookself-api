import pkg from "@prisma/client";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export { prisma };
