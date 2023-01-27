import { notFoundError } from "../errors/not-found-error.js";
import { StatsMainDB } from "../protocols.js";
import { statsRepository, topsRepository } from "../repositories/index.js";

async function listMainStats(year: number) {
    const existYear = await statsRepository.selectYear(year);
    if (!existYear) throw notFoundError();

    const booksRead = await statsRepository.selectStatsBooksRead(existYear.year);
    if (!booksRead) throw notFoundError();
    const hoursListened = {
        hours: Math.floor(booksRead._sum.minutes),
        minutes: booksRead._sum.minutes % 60,
    }

    const pagesRead = await statsRepository.countPagesRead(existYear.year);

    const dates = await statsRepository.daysToFinishRead(existYear.year);
    if (!dates) throw notFoundError();

    let averageDaysToRead = 0;
    dates.forEach(e => {
        const dayFinished = new Date(e.date_finished).getTime();
        const dayStarted = new Date(e.date_started).getTime();
        const milissecToDays = 1 * 24 * 60 * 60 * 1000;

        averageDaysToRead += (dayFinished - dayStarted)/milissecToDays;
    }, 0);
    averageDaysToRead = averageDaysToRead/dates.length;

    const ownedBooks = await statsRepository.countOwnedBooks();
    if (!ownedBooks) throw notFoundError();

    const ownedBooksRead = await statsRepository.countOwnedBooksRead();
    if (!ownedBooksRead) throw notFoundError();

    const favoriteBook = (await topsRepository.findFavoriteBooks(existYear.id))[0];
    if (!favoriteBook) throw notFoundError();

    const mainStats: StatsMainDB = {
        year: existYear.year,
        total_books_read: booksRead._count.id,
        total_pages_read: pagesRead._sum.pages,
        total_hours_listened: hoursListened,
        reading_goal: existYear.reading_goal,
        total_books_owned: ownedBooks._count.id,
        owned_books_read: ownedBooksRead._count.book_id,
        average_days_to_read: averageDaysToRead,
        average_rating: Number(booksRead._avg.rating),
        favorite_book: favoriteBook.books.title,
        most_pages: pagesRead._max.pages,
        least_pages: pagesRead._min.pages,
    }

    return mainStats;
}

const statsService = {
    listMainStats,
};

export { statsService };