import { Request, Response } from "express";
import { purchasesService } from "../services/index.js";
import { purchases, books_books, authors_authors } from "@prisma/client";

export async function getLastPurchases(_req: Request, res: Response) {
    try {
        const lastPurchases: (purchases & {
            books: books_books & {
                authors_books: {
                    authors: authors_authors;
                }[];
            };
        })[] = await purchasesService.listLastPurchases();

        return res.status(200).send(lastPurchases);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
