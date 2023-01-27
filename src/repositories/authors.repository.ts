import { prisma, connection } from "../database/database.js";

async function selectAllAuthors() {
    return prisma.authors_authors.findMany({
        include: {
            countries: true
        }
    });
}

async function selectCountry(name: string) {
    const query: string = `
        SELECT
            *
        FROM authors.countries
        WHERE name ILIKE $1;
    `;

    return connection.query(query, [name]);
}

async function insertNewCountry(name: string) {
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
