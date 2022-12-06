import { Request, Response } from "express";
import { ReadingBookDB } from "../protocols";
import { booksService } from "../services/index.js";

export async function getReadingBooks(_req: Request, res: Response) {
    try {
        const readingBooks: ReadingBookDB[] = await booksService.listReadingBooks();

        return res.status(200).send(readingBooks);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
