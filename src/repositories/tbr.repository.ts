import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { TBRPriorityDB } from "../protocols.js";

async function selectPriorityTBR(): Promise<QueryResult<TBRPriorityDB>> {
    const query: string = `
        SELECT
            b.id,
            b.image
        FROM shelves.tbr t
        JOIN books.books b ON t.book_id = b.id
        WHERE priority = 't'
        ORDER BY b.id;
    `;

    return connection.query(query);
}

const tbrRepository = {
    selectPriorityTBR,
}

export { tbrRepository };