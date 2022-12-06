import express from "express";
import { getReadingBooks } from "../controllers/index.js";

const booksRouter = express.Router();
booksRouter
    .get("/reading", getReadingBooks);

export { booksRouter };
