import { prisma } from "../database/database.js";

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

const booksRepository = {
    selectReadingBooks,
};

export { booksRepository };
