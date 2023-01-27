import { Request, Response } from "express";
import { authors_authors, countries } from "@prisma/client";
import { authorsService } from "../services/index.js";

export async function getAllAuthors(_req: Request, res: Response) {
    try {
        const authors: (authors_authors & { countries: countries; })[] = await authorsService.listAllAuthors();

        return res.status(200).send(authors);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error);
        }
        return res.status(204).send(error);
    }
}
