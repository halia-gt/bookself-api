import { QueryResult } from "pg";
import { notFoundError } from "../errors/not-found-error.js";
import { StatsMainDB } from "../protocols.js";
import { statsRepository } from "../repositories/index.js";

async function listMainStats(year: number): Promise<StatsMainDB> {
    const existYear = await statsRepository.selectYear(year);
    if (existYear.rows.length === 0) throw notFoundError();

    const result: QueryResult<StatsMainDB> = await statsRepository.selectMainStats(year);
    if (!result) throw notFoundError();

    return result.rows[0];
}

const statsService = {
    listMainStats,
};

export { statsService };