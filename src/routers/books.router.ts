import { yearParamsVerify } from "../middlewares/year.middleware.js";
import express from "express";
import { getBook, getBooksRead, getReadingBooks } from "../controllers/index.js";

const booksRouter = express.Router();
booksRouter
    .get("/reading", getReadingBooks)
    .get("/read/:year", yearParamsVerify, getBooksRead)
    .get("/:bookId", getBook);

export { booksRouter };
