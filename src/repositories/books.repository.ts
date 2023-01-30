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

async function selectBooksRead(year: number) {
    return prisma.books_read.findMany({
        where: {
            date_finished: {
                lte: new Date(`${year}-12-31`).toISOString(),
                gte: new Date(`${year}-01-01`).toISOString(),
            },
        },
        include: {
            books: {
                include: {
                    authors_books: {
                        include: {
                            authors: true,
                        }
                    },
                    genres: true,
                    subgenres: true,
                    series_books: {
                        include: {
                            series: true,
                        }
                    },
                    owned: true,
                    books: true,
                }
            }
        },
        orderBy: {
            date_started: "asc",
        }
    });
}

const booksRepository = {
    selectReadingBooks,
    selectBooksRead,
};

export { booksRepository };
