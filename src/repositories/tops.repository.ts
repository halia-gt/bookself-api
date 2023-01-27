import { prisma } from "../database/database.js";

async function findFavoriteBooks(year_id: number) {
    return prisma.tops_books.findMany({
        where: {
            year_id,
        },
        include: {
            books: true,
        },
        orderBy: {
            position: 'asc',
        }
    });
}

const topsRepository = {
    findFavoriteBooks,
};

export { topsRepository };