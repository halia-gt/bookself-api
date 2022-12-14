import { Request, Response } from "express";
import { badRequestError } from "../errors/bad-request-error.js";
import { StatsMainDB } from "../protocols.js";
import { statsService } from "../services/stats.service.js";

export async function getMainStats(req: Request, res: Response) {
    const { year: yearString } = req.params;
    const year = Number(yearString);

    if (!yearString || isNaN(year)) throw badRequestError("Something is missing in the requisition");

    try {
        const mainStats: StatsMainDB = await statsService.listMainStats(year);

        return res.status(200).send(mainStats);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequstError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
