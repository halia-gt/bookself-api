import express from "express";
import { getFormatStats, getGenreStats, getMainStats, getMonthlyStats, getStarsStats, getYears } from "../controllers/index.js";

const statsRouter = express.Router();
statsRouter
    .get("/years", getYears)
    .get("/main/:year", getMainStats)
    .get("/months/:year", getMonthlyStats)
    .get("/formats/:year", getFormatStats)
    .get("/stars/:year", getStarsStats)
    .get("/genres/:year", getGenreStats);

export { statsRouter };
