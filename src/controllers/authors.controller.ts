import { Request, Response } from "express";
import { AuthorDB } from "../protocols.js";
import { authorsService } from "../services/index.js";

export async function getAllAuthors(_req: Request, res: Response) {
    try {
        const authors: AuthorDB[] = await authorsService.listAllAuthors();

        return res.status(200).send(authors);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
