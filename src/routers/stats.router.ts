import express from "express";
import { yearParamsVerify } from "../middlewares/year.middleware.js";
import { getFormatStats, getGenreStats, getMainStats, getMonthlyStats, getStarsStats, getYears } from "../controllers/index.js";

const statsRouter = express.Router();
statsRouter
    .get("/years", getYears)
    .get("/main/:year", yearParamsVerify, getMainStats)
    .get("/months/:year", yearParamsVerify, getMonthlyStats)
    .get("/formats/:year", yearParamsVerify, getFormatStats)
    .get("/stars/:year", yearParamsVerify, getStarsStats)
    .get("/genres/:year", yearParamsVerify, getGenreStats);

export { statsRouter };
