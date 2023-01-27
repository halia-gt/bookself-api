import express from "express";
import { getMainStats, getYears } from "../controllers/index.js";

const statsRouter = express.Router();
statsRouter
    .get("/years", getYears)
    .get("/main/:year", getMainStats);

export { statsRouter };
