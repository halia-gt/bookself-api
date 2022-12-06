import { QueryResult } from "pg";
import { notFoundError } from "../errors/not-found-error.js";
import { ReadingBookDB } from "../protocols.js";
import { booksRepository } from "../repositories/index.js";

async function listReadingBooks(): Promise<ReadingBookDB[]> {
    const result: QueryResult<ReadingBookDB> = await booksRepository.selectReadingBooks();
    if (!result) throw notFoundError();

    return result.rows;
}

const booksService = {
    listReadingBooks,
};

export { booksService };