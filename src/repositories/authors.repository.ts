import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { AuthorDB } from "../protocols.js";

async function selectAllAuthors(): Promise<QueryResult<AuthorDB>> {
    const query: string = `SELECT
            a.id,
            a.name,
            a.identity,
            c.name AS country
        FROM authors.authors a
        JOIN authors.countries c ON c.id = a.country_id
        ORDER BY a.id;
    `;
    return connection.query(query);
}

const authorsRepository = {
    selectAllAuthors,
};

export { authorsRepository };
