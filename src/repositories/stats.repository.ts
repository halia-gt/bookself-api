import { prisma } from "../database/database.js";

async function selectYears() {
    return prisma.years.findMany({
        where: {
            year: {
                gte: 2022,
            }
        }
    });
}

async function selectYear(year: number) {
    return prisma.years.findFirst({
        where: {
            year,
        }
    });
}

async function selectStatsBooksRead(year: number) {
    return prisma.books_read.aggregate({
        where: {
            date_finished: {
                lte: new Date(`${year}-12-31`).toISOString(),
                gte: new Date(`${year}-01-01`).toISOString(),
            },
        },
        _count: {
            id: true,
        },
        _sum: {
            minutes: true,
        },
        _avg: {
            rating: true,
        }
    });
}

async function countPagesRead(year: number) {
    return prisma.books_books.aggregate({
        where: {
            books_read: {
                some: {
                    date_finished: {
                        lte: new Date(`${year}-12-31`).toISOString(),
                        gte: new Date(`${year}-01-01`).toISOString(),
                    }
                }
            }
        },
        _sum: {
            pages: true,
        },
        _max: {
            pages: true,
        },
        _min: {
            pages: true,
        }
    });
}

async function daysToFinishRead(year: number) {
    return prisma.books_read.findMany({
        where: {
            date_finished: {
                lte: new Date(`${year}-12-31`).toISOString(),
                gte: new Date(`${year}-01-01`).toISOString(),
            },
        },
        select: {
            date_started: true,
            date_finished: true,
        }
    });
}

async function countOwnedBooks() {
    return prisma.owned.aggregate({
        _count: {
            id: true,
        }
    });
}

async function countOwnedBooksRead() {
    const ownedBooks = (await prisma.owned.findMany({
        select: {
            book_id: true,
        }        
    })).map(e => e.book_id);

    return prisma.books_read.aggregate({
        where: {
            books: {
                owned: {
                    some: {
                        book_id: {
                            in: ownedBooks,
                        }
                    }
                }
            }
        },
        _count: {
            book_id: true,
        }
    });
}


const statsRepository = {
    selectYears,
    selectYear,
    selectStatsBooksRead,
    countPagesRead,
    daysToFinishRead,
    countOwnedBooks,
    countOwnedBooksRead,
};

export { statsRepository };
