import { yearParamsVerify } from "../middlewares/year.middleware.js";
import express from "express";
import { getBooksRead, getReadingBooks } from "../controllers/index.js";

const booksRouter = express.Router();
booksRouter
    .get("/reading", getReadingBooks)
    .get("/read/:year", yearParamsVerify, getBooksRead);

export { booksRouter };
