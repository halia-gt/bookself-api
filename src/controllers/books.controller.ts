import { Request, Response } from "express";
import { booksService } from "../services/index.js";
import { authors_books, books_books, authors_authors, books_read } from "@prisma/client";


export async function getReadingBooks(_req: Request, res: Response) {
    try {
        const readingBooks: (authors_books & {
            books: books_books & {
                books_read: books_read[];
            };
            authors: authors_authors;
        })[] = await booksService.listReadingBooks();

        return res.status(200).send(readingBooks);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
