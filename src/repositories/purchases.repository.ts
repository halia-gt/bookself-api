import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { PurchasesDB } from "../protocols.js";

async function selectLastPurchases(): Promise<QueryResult<PurchasesDB>> {
    const query: string = `
        SELECT
            p.id,
            p.book_id,
            b.title,
            a.name AS author,
            b.image,
            p.price,
            p.format,
            p.store,
            DATE_PART(
                'month', p.date
            ) AS month            
        FROM shelves.purchases p
        JOIN books.books b ON p.book_id = b.id
        JOIN books.authors_books ab ON b.id = ab.book_id
        JOIN authors.authors a ON ab.author_id = a.id
        ORDER BY p.date DESC
        LIMIT 3;
    `;

    return connection.query(query);
}

const purchasesRepository = {
    selectLastPurchases,
};

export { purchasesRepository };