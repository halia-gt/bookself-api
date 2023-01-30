import { NextFunction, Request, Response } from "express";

export async function yearParamsVerify(req: RequestWithYear, res: Response, next: NextFunction) {
    const { year: yearString } = req.params;
    const year = Number(yearString);

    if (!yearString || isNaN(year)) return res.sendStatus(400);

    req.year = year;
    return next();
}

export type RequestWithYear = Request & YearAsParams;

type YearAsParams = {
    year: number;
};
