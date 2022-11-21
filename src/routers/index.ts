import express from "express";
import { authorsRouter } from "./authors.router";

const router = express.Router();
router.use(authorsRouter);

export { router };