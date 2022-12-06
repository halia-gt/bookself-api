import express from "express";
import { authorsRouter } from "./authors.router.js";

const router = express.Router();
router.get("/health", (_req, res) => res.sendStatus(200));
router.use("/authors", authorsRouter);

export { router };
