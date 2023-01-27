import { authors_authors, countries } from "@prisma/client";
import { notFoundError } from "../errors/not-found-error.js";
import { authorsRepository } from "../repositories/index.js";

async function listAllAuthors(): Promise<(authors_authors & { countries: countries; })[]> {
    const result: (authors_authors & { countries: countries; })[]  = await authorsRepository.selectAllAuthors();
    if (!result) throw notFoundError();

    return result;
}

const authorsService = {
    listAllAuthors,
};

export { authorsService };
