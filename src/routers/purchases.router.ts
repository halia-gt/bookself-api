import express from "express";
import { getLastPurchases } from "../controllers/index.js";

const purchasesRouter = express.Router();
purchasesRouter
    .get("/last", getLastPurchases);

export { purchasesRouter };