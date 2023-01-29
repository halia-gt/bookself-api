import express from "express";
import { getFormatStats, getMainStats, getMonthlyStats, getYears } from "../controllers/index.js";

const statsRouter = express.Router();
statsRouter
    .get("/years", getYears)
    .get("/main/:year", getMainStats)
    .get("/months/:year", getMonthlyStats)
    .get("/formats/:year", getFormatStats);

export { statsRouter };
