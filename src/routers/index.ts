import express from "express";
import { authorsRouter } from "./authors.router.js";
import { booksRouter } from "./books.router.js";

const router = express.Router();
router.get("/health", (_req, res) => res.sendStatus(200));
router.use("/authors", authorsRouter);
router.use("/books", booksRouter);

export { router };
