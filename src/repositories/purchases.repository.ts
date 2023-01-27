import { prisma } from "../database/database.js";

async function selectLastPurchases() {
    return prisma.purchases.findMany({
        take: 3,
        include: {
            books: {
                include: {
                    authors_books: {
                        select: {
                            authors: true,
                        }
                    }
                }
            },
        },
        orderBy: {
            date: "desc",
        }
    });
}

const purchasesRepository = {
    selectLastPurchases,
};

export { purchasesRepository };
