import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { ReadingBookDB } from "../protocols.js";

async function selectReadingBooks(): Promise<QueryResult<ReadingBookDB>> {
    const query: string = `
        SELECT
            br.book_id AS id,
            b.title,
            a.name AS author,
            b.image
        FROM shelves.books_read br
        JOIN books.books b ON br.book_id = b.id
        JOIN books.authors_books ab ON b.id = ab.book_id
        JOIN authors.authors a ON ab.author_id = a.id
        WHERE br.date_started IS NOT NULL AND br.date_finished IS NULL
        ORDER BY br.id;
    `;
    return connection.query(query);
}

const booksRepository = {
    selectReadingBooks,
};

export { booksRepository };
