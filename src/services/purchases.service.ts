import { QueryResult } from "pg";
import { notFoundError } from "../errors/not-found-error.js";
import { PurchasesDB } from "../protocols.js";
import { purchasesRepository } from "../repositories/index.js";

async function listLastPurchases(): Promise<PurchasesDB[]> {
    const result: QueryResult<PurchasesDB> = await purchasesRepository.selectLastPurchases();
    if (!result) throw notFoundError();

    return result.rows;
}

const purchasesService = {
    listLastPurchases,
};

export { purchasesService };