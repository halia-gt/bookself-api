import { notFoundError } from "../errors/not-found-error.js";
import { booksRepository } from "../repositories/index.js";
import { authors_books, books_books, authors_authors, books_read } from "@prisma/client";

async function listReadingBooks(): Promise<(authors_books & {
    books: books_books & {
        books_read: books_read[];
    };
    authors: authors_authors;
})[]> {
    const result: (authors_books & {
        books: books_books & {
            books_read: books_read[];
        };
        authors: authors_authors;
    })[] = await booksRepository.selectReadingBooks();
    if (!result) throw notFoundError();

    return result;
}

const booksService = {
    listReadingBooks,
};

export { booksService };