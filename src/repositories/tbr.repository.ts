import { prisma } from "../database/database.js";

async function selectPriorityTBR() {
    return prisma.tbr.findMany({
        where: {
            priority: true,
        },
        include: {
            books: true,
        },
        take: 4,
    });
}

const tbrRepository = {
    selectPriorityTBR,
}

export { tbrRepository };