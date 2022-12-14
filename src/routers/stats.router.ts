import express from "express";
import { getMainStats } from "../controllers/index.js";

const statsRouter = express.Router();
statsRouter
    .get("/:year", getMainStats);

export { statsRouter };