import express from "express";
import { getAllAuthors } from "../controllers/authors.controller.js";

const authorsRouter = express.Router();
authorsRouter
    .get("/", getAllAuthors);

export { authorsRouter };
