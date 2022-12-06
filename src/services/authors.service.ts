import { QueryResult } from "pg";
import { notFoundError } from "../errors/not-found-error.js";
import { AuthorDB } from "../protocols.js";
import { authorsRepository } from "../repositories/authors.repository.js";

async function listAllAuthors(): Promise<AuthorDB[]> {
    const result: QueryResult<AuthorDB> = await authorsRepository.selectAllAuthors();
    if (!result) throw notFoundError();

    return result.rows;
}

const authorsService = {
    listAllAuthors,
};

export { authorsService };
