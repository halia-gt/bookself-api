import { notFoundError } from "../errors/not-found-error.js";
import { purchasesRepository } from "../repositories/index.js";
import { purchases, books_books, authors_authors } from "@prisma/client";

async function listLastPurchases(): Promise<(purchases & {
    books: books_books & {
        authors_books: {
            authors: authors_authors;
        }[];
    };
})[]> {
    const result: (purchases & {
        books: books_books & {
            authors_books: {
                authors: authors_authors;
            }[];
        };
    })[] = await purchasesRepository.selectLastPurchases();
    if (!result) throw notFoundError();

    return result;
}

const purchasesService = {
    listLastPurchases,
};

export { purchasesService };