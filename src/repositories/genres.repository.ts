import { prisma } from "../database/database.js";

async function selectAllGenres() {
    return prisma.genres.findMany();
}

const genresRepository = {
    selectAllGenres,
};

export { genresRepository };
