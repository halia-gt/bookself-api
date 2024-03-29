import { RequestWithYear } from "../middlewares/year.middleware.js";
import { years } from "@prisma/client";
import { Request, Response } from "express";
import { StatsMainDB } from "../protocols.js";
import { statsService } from "../services/stats.service.js";

export async function getYears(_req: Request, res: Response) {
    try {
        const years: years[] = await statsService.listAllYears();

        return res.status(200).send(years);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}

export async function getMainStats(req: RequestWithYear, res: Response) {
    const { year } = req;

    try {
        const mainStats: StatsMainDB = await statsService.listMainStats(year);

        return res.status(200).send(mainStats);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}

export async function getMonthlyStats(req: RequestWithYear, res: Response) {
    const { year } = req;

    try {
        const monthlyStats = await statsService.listMonthlyStats(year);

        return res.status(200).send(monthlyStats);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}

export async function getFormatStats(req: RequestWithYear, res: Response) {
    const { year } = req;

    try {
        const formatStats = await statsService.listFormatStats(year);

        return res.status(200).send(formatStats);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}

export async function getStarsStats(req: RequestWithYear, res: Response) {
    const { year } = req;

    try {
        const startStats = await statsService.listStarStats(year);

        return res.status(200).send(startStats);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}

export async function getGenreStats(req: RequestWithYear, res: Response) {
    const { year } = req;

    try {
        const genreStats = await statsService.listGenreStats(year);

        return res.status(200).send(genreStats);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}
