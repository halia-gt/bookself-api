import { notFoundError } from "../errors/not-found-error.js";
import { booksRepository } from "../repositories/index.js";
import {
    authors_books,
    books_books,
    authors_authors,
    books_read,
    countries,
    tops_books,
    audiences,
    genres,
    subgenres,
    representativities_books,
    representativities,
    series_books,
    books_series,
    owned
} from "@prisma/client";
import { BookRead } from "protocols.js";

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

async function listBooksRead(year: number) {
    const result = await booksRepository.selectBooksRead(year);
    if (!result) throw notFoundError();

    return result;
}

async function findBook(book_id: number) {
    const book: CompleteBook[] = await booksRepository.selectBookById(book_id);
    if (!book) throw notFoundError();

    if (book.length === 1) return book[0];

    let bookWithMultipleAuthors: CompleteBook & { authors: (authors_authors & {
            countries: countries,
        })[]
    } | {} = {};
    let authors: (authors_authors & { countries: countries })[] | [] = [];

    book.forEach(element => {
        bookWithMultipleAuthors = {
            ...element,
            authors: [...authors, { ...element.authors }],
        };

        authors = [...authors, { ...element.authors }];
    });

    return bookWithMultipleAuthors;
}

type CompleteBook = authors_books & {
    books: books_books & {
        books: tops_books[];
        audiences: audiences;
        genres: genres;
        subgenres: subgenres;
        representativities_books?: (representativities_books & {
            representativities: representativities,
        })[];
        series_books?: (series_books & {
            series: books_series,
        })[];
        books_read: books_read[];
        owned: owned[];
    };
    authors: authors_authors & {
        countries: countries,
    };
};

async function updateBookAsRead(book_id: number, body: BookRead) {
    const book: books_books = await booksRepository.findSimpleBookById(book_id);
    if (!book) throw notFoundError();

    const bookRead: books_read = await booksRepository.findSimpleBookReadById(book_id);
    if (!bookRead) throw notFoundError();

    await booksRepository.updateBookRead(bookRead.id, body.date_finished, body.rating);
}

const booksService = {
    listReadingBooks,
    listBooksRead,
    findBook,
    updateBookAsRead,
};

export { booksService };
