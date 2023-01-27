import { QueryResult } from "pg";
import { connection, prisma } from "../database/database.js";

async function selectReadingBooks() {
    return prisma.authors_books.findMany({
        where: {
            books: {
                books_read: {
                    some: {
                        AND: [
                            { date_started: { not: null } },
                            { date_finished: null },

                        ],
                    },
                }
            }

        },
        include: {
            books: {
                include: {
                    books_read: true,
                }
            },
            authors: true,
        }
    });
}

async function selectBooksRead(): Promise<QueryResult> {
    const query: string = `
        SELECT
            br.book_id,
            b.title,
            a.name AS author,
            br.rating
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
    selectBooksRead,
};

export { booksRepository };
