import { Request, Response } from "express";
import { PurchasesDB } from "../protocols.js";
import { purchasesService } from "../services/index.js";

export async function getLastPurchases(_req: Request, res: Response) {
    try {
        const lastPurchases: PurchasesDB[] = await purchasesService.listLastPurchases();

        return res.status(200).send(lastPurchases);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
