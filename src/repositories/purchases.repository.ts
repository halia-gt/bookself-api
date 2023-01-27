import { prisma } from "../database/database.js";

async function selectLastPurchases() {
    const query: string = `
        SELECT
            p.id,
            p.book_id,
            b.title,
            a.name AS author,
            b.image,
            p.price,
            p.format,
            p.store,
            DATE_PART(
                'month', p.date
            ) AS month            
        FROM shelves.purchases p
        JOIN books.books b ON p.book_id = b.id
        JOIN books.authors_books ab ON b.id = ab.book_id
        JOIN authors.authors a ON ab.author_id = a.id
        ORDER BY p.date DESC
        LIMIT 3;
    `;

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
