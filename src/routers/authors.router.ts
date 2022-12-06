import express from "express";
import { getAllAuthors } from "../controllers/index.js";

const authorsRouter = express.Router();
authorsRouter
    .get("/", getAllAuthors);

export { authorsRouter };
