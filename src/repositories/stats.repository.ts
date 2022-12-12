import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { StatsMainDB } from "../protocols.js";

async function selectMainStats(year: number): Promise<QueryResult<StatsMainDB>> {
    const query: string = `
        SELECT
            y.reading_goal,
            COUNT(o.book_id) AS total_books_owned,
            COUNT(br.book_id) AS owned_books_read,
            b.title AS favorite_book,
            t1.*
        FROM (
            SELECT
                EXTRACT(YEAR FROM br.date_finished) AS year,
                COUNT(br.id) AS total_books_read,
                SUM(b.pages) AS total_pages_read,
                COALESCE(SUM(br.hours), '00:00:00') AS total_hours_listened,
                ROUND(AVG(br.date_finished - br.date_started), 1) AS average_days_to_read,
                ROUND(AVG(br.rating), 2) AS average_rating,
                MAX(b.pages) AS most_pages,
                MIN(b.pages) AS least_pages
            FROM shelves.books_read br
            JOIN books.books b ON br.book_id = b.id
            WHERE EXTRACT(YEAR FROM br.date_finished) = $1
            GROUP BY year
        ) AS t1
        JOIN tops.years y ON t1.year = y.year
        CROSS JOIN shelves.owned o
        LEFT JOIN shelves.books_read br ON o.book_id = br.book_id
        JOIN tops.books top ON y.id = top.year_id AND top.position = 1
        JOIN books.books b ON top.book_id = b.id
        GROUP BY
            y.reading_goal,
            t1.year,
            t1.total_books_read,
            t1.total_pages_read,
            t1.total_hours_listened,
            t1.average_days_to_read,
            t1.average_rating,
            t1.most_pages,
            t1.least_pages,
            b.title;
    `;
    
    return connection.query(query, [ year ]);
}

async function selectYear(year: number): Promise<QueryResult<StatsMainDB>> {
    const query: string = `
        SELECT
            *
        FROM tops.years
        WHERE year = $1;
    `;
    
    return connection.query(query, [ year ]);
}

const statsRepository = {
    selectMainStats,
    selectYear
};

export { statsRepository };
