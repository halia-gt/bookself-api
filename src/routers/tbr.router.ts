import express from "express";
import { getPriorityTBR } from "../controllers/index.js";

const tbrRouter = express.Router();
tbrRouter
    .get("/priority", getPriorityTBR);

export { tbrRouter };