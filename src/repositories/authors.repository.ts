import { prisma } from "../database/database.js";

async function selectAllAuthors() {
    return prisma.authors_authors.findMany({
        include: {
            countries: true
        }
    });
}

const authorsRepository = {
    selectAllAuthors,
};

export { authorsRepository };
