import express from "express";
import { authorsRouter } from "./authors.router.js";
import { booksRouter } from "./books.router.js";
import { purchasesRouter } from "./purchases.router.js";
import { tbrRouter } from "./tbr.router.js";

const router = express.Router();
    router
        .get("/health", (_req, res) => res.sendStatus(200))
        .use("/authors", authorsRouter)
        .use("/books", booksRouter)
        .use("/tbr", tbrRouter)
        .use("/purchases", purchasesRouter)

export { router };
