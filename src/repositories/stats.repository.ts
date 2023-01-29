import { prisma } from "../database/database.js";

async function selectYears() {
    return prisma.years.findMany({
        where: {
            year: {
                gte: 2022,
            }
        },
        orderBy: {
            year: "desc",
        },
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

async function countMonthlyBooksRead(year: number) {
    const result: {
        books: number,
        minutes: number,
    }[] = [{ books: 0, minutes: 0 }];

    for (let i = 1 ; i <= 12 ; i++) {
        const lastDay = new Date(year, i, 0).getDate();

        const aux = await prisma.books_read.aggregate({
            where: {
                date_finished: {
                    lte: new Date(`${year}-${i}-${lastDay}`).toISOString(),
                    gte: new Date(`${year}-${i}-01`).toISOString(),
                },
            },
            _count: {
                book_id: true,
            },
            _sum: {
                minutes: true,  
            },
        });

        result[i - 1] = {
            books: aux._count.book_id === null ? 0 : aux._count.book_id,
            minutes: aux._sum.minutes === null ? 0 : aux._sum.minutes,
        };
    }

    return result;
}

async function countMonthlyPagesRead(year: number) {
    const result: {
        pages: number,
    }[] = [{ pages: 0 }];

    for (let i = 1 ; i <= 12 ; i++) {
        const lastDay = new Date(year, i, 0).getDate();

        const aux = await prisma.books_books.aggregate({
            where: {
                books_read: {
                    some: {
                        date_finished: {
                            lte: new Date(`${year}-${i}-${lastDay}`).toISOString(),
                            gte: new Date(`${year}-${i}-01`).toISOString(),
                        }, 
                    }
                },
            },
            _sum: {
                pages: true,
            }
        });

        result[i - 1] = {
            pages: aux._sum.pages === null ? 0 : aux._sum.pages,
        };
    }

    return result;
}

async function groupBooksByFormat(year: number) {
    return prisma.books_read.groupBy({
        by: ["book_format"],
        where: {
            date_finished: {
                lte: new Date(`${year}-12-31`).toISOString(),
                gte: new Date(`${year}-01-01`).toISOString(),
            },
        },
        _count: {
            book_id: true,
        },
    });
}

async function groupBooksByStars(year: number) {
    return prisma.books_read.groupBy({
        by: ["rating"],
        where: {
            date_finished: {
                lte: new Date(`${year}-12-31`).toISOString(),
                gte: new Date(`${year}-01-01`).toISOString(),
            },
        },
        _count: {
            book_id: true,
        },
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
    countMonthlyBooksRead,
    countMonthlyPagesRead,
    groupBooksByFormat,
    groupBooksByStars,
};

export { statsRepository };
