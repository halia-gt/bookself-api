import { QueryResult } from "pg";
import { notFoundError } from "../errors/not-found-error.js";
import { TBRPriorityDB } from "../protocols.js";
import { tbrRepository } from "../repositories/index.js";

async function listPriorityTBR(): Promise<TBRPriorityDB[]> {
    const result: QueryResult<TBRPriorityDB> = await tbrRepository.selectPriorityTBR();
    if (!result) throw notFoundError();

    return result.rows;
}

const tbrService = {
    listPriorityTBR,
};

export { tbrService };