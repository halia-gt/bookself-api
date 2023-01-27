import { QueryResult } from "pg";
import { notFoundError } from "../errors/not-found-error.js";
import { TBRPriorityDB } from "../protocols.js";
import { tbrRepository } from "../repositories/index.js";
import { tbr, books_books } from "@prisma/client";

async function listPriorityTBR(): Promise<(tbr & {
    books: books_books;
})[]> {
    const result: (tbr & {
        books: books_books;
    })[] = await tbrRepository.selectPriorityTBR();
    if (!result) throw notFoundError();

    return result;
}

const tbrService = {
    listPriorityTBR,
};

export { tbrService };