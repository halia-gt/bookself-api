import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { AuthorDB, SimpleTableDB, SimpleTableId } from "../protocols.js";

async function selectAllAuthors(): Promise<QueryResult<AuthorDB>> {
    const query: string = `
        SELECT
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

async function selectCountry(name: string): Promise<QueryResult<SimpleTableDB>> {
    const query: string = `
        SELECT
            *
        FROM authors.countries
        WHERE name ILIKE $1;
    `;

    return connection.query(query, [name]);
}

async function insertNewCountry(name: string): Promise<QueryResult<SimpleTableId>> {
    const query: string = `
        INSERT INTO authors.countries
            (name)
        VALUES ($1)
        RETURNING id;
    `;

    return connection.query(query, [name]);
}

const authorsRepository = {
    selectAllAuthors,
    selectCountry,
    insertNewCountry,
};

export { authorsRepository };
