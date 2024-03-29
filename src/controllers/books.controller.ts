import { Request, Response } from "express";
import { booksService } from "../services/index.js";
import { authors_books, books_books, authors_authors, books_read } from "@prisma/client";
import { RequestWithYear } from "middlewares/year.middleware.js";
import { badRequestError } from "../errors/bad-request-error.js";
import { baseSchemas } from "../schemas/schemas.js";

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

export async function getBooksRead(req: RequestWithYear, res: Response) {
    const { year } = req;

    try {
        const booksRead = await booksService.listBooksRead(year);

        return res.status(200).send(booksRead);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}

export async function getBook(req: Request, res: Response) {
    const { bookId } = req.params;
    const book_id = Number(bookId);

    if (!book_id || isNaN(book_id)) throw badRequestError("Something is missing on your requisition");

    try {
        const book = await booksService.findBook(book_id);

        return res.status(200).send(book);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}

export async function postBookRead(req: Request, res: Response) {
    const { bookId } = req.params;
    const book_id = Number(bookId);

    if (!book_id || isNaN(book_id)) throw badRequestError("Something is missing on your requisition");

    const validation = baseSchemas["bookRead"].validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        res.status(422).send({ message: errors });
        return;
    }

    try {
        await booksService.updateBookAsRead(book_id, req.body);

        return res.sendStatus(200);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        if (error.name === "BadRequestError") {
            return res.status(400).send(error);
        }
        return res.status(204).send(error);
    }
}
