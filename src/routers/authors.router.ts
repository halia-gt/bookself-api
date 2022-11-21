import express from "express";

const authorsRouter = express.Router();
authorsRouter.get("/oie", (_req, res) => {res.send('oie')});

export { authorsRouter };