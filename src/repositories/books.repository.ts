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

async function selectBookById(book_id: number) {
    return prisma.authors_books.findMany({
        where: {
            book_id,
        },
        include: {
            books: {
                include: {
                    audiences: true,
                    genres: true,
                    subgenres: true,
                    representativities_books: {
                        include: {
                            representativities: true,
                        }
                    },
                    series_books: {
                        include: {
                            series: true,
                        }
                    },
                    books_read: true,
                    owned: true,
                    books: true,
                }
            },
            authors: {
                include: {
                    countries: true,
                }
            }
        },
    });
}

async function findSimpleBookById(book_id: number) {
    return prisma.books_books.findUnique({
        where: {
            id: book_id,
        }
    });
}

async function findSimpleBookReadById(book_id: number) {
    return prisma.books_read.findFirst({
        where: {
            book_id,
        }
    });
}

async function updateBookRead(id: number, date_finished: Date, rating: number) {
    return prisma.books_read.update({
        where: {
            id,
        },
        data: {
            date_finished,
            rating,
        }
    });
}

const booksRepository = {
    selectReadingBooks,
    selectBooksRead,
    selectBookById,
    findSimpleBookById,
    findSimpleBookReadById,
    updateBookRead,
};

export { booksRepository };
