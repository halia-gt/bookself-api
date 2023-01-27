import { Request, Response } from "express";
import { tbrService } from "../services/index.js";
import { tbr, books_books } from "@prisma/client";

export async function getPriorityTBR(_req: Request, res: Response) {
    try {
        const priorityTBRbooks: (tbr & {
            books: books_books;
        })[] = await tbrService.listPriorityTBR();

        return res.status(200).send(priorityTBRbooks);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
