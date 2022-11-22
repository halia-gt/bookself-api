import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { Genre, GenreId } from "../protocols.js";

async function selectAllGenres(): Promise<QueryResult<Genre>> {
    const query: string = `
        SELECT
            *
        FROM books.genres
        ORDER BY id;
    `;

    return connection.query(query);
}

async function selectAllSubgenres(): Promise<QueryResult<Genre>> {
    const query: string = `
        SELECT
            *
        FROM books.subgenres
        ORDER BY id;
    `;

    return connection.query(query);
}

async function selectOneSubgenre(name: string): Promise<QueryResult<Genre>> {
    const query: string = `
        SELECT
            *
        FROM books.subgenres
        WHERE name = $1;
    `;

    return connection.query(query, [name]);
}

async function insertNewSubgenre(name: string): Promise<QueryResult<GenreId>> {
    const query: string = `
        INSERT INTO books.subgenres
            (name)
        VALUES ($1)
        RETURNING id;
    `;

    return connection.query(query, [name]);
}

const genresRepository = {
    selectAllGenres,
    selectAllSubgenres,
    selectOneSubgenre,
    insertNewSubgenre
};

export { genresRepository };
