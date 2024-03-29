import { notFoundError } from "../errors/not-found-error.js";
import { StatsMainDB } from "../protocols.js";
import { genresRepository, statsRepository, topsRepository } from "../repositories/index.js";

async function listAllYears() {
    const years = await statsRepository.selectYears();
    if (!years) throw notFoundError();

    return years;
}

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
    averageDaysToRead = Number((averageDaysToRead/dates.length).toFixed(1));

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
        average_rating: Number(booksRead._avg.rating.toFixed(1)),
        favorite_book: favoriteBook.books.title,
        most_pages: pagesRead._max.pages,
        least_pages: pagesRead._min.pages,
    }

    return mainStats;
}

async function listMonthlyStats(year: number) {
    const existYear = await statsRepository.selectYear(year);
    if (!existYear) throw notFoundError();

    const booksRead = await statsRepository.countMonthlyBooksRead(existYear.year);
    const pagesRead = await statsRepository.countMonthlyPagesRead(existYear.year);

    const result = booksRead.map((element, index) => {
        return {
            ...element,
            month: index + 1,
            pages: pagesRead[index].pages,
        }
    });

    return result;
}

async function listFormatStats(year: number) {
    const existYear = await statsRepository.selectYear(year);
    if (!existYear) throw notFoundError();

    const result = await statsRepository.groupBooksByFormat(existYear.year);

    return result;
}

async function listStarStats(year: number) {
    const existYear = await statsRepository.selectYear(year);
    if (!existYear) throw notFoundError();

    const result = await statsRepository.groupBooksByStars(existYear.year);

    return result;
}

async function listGenreStats(year: number) {
    const existYear = await statsRepository.selectYear(year);
    if (!existYear) throw notFoundError();

    const genresCount = await statsRepository.groupBooksByGenres(existYear.year);
    const genresName = await genresRepository.selectAllGenres();
    const hashtable: Hashtable = {};

    genresName.forEach(element => hashtable[element.id] = element.name);

    const result = genresCount.map(element => {
        return {
            ...element,
            genre: hashtable[element.genre_id],
        }
    });

    return result;
}

interface Hashtable {
    [key: string]: string;
}

const statsService = {
    listAllYears,
    listMainStats,
    listMonthlyStats,
    listFormatStats,
    listStarStats,
    listGenreStats,
};

export { statsService };