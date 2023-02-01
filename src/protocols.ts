export type ApplicationError = {
    name: string,
    message: string
};

export type AuthorDB = {
    id: number,
    name: string,
    identity: string,
    country: string
};

export type Author = Omit<AuthorDB, "id">;

export type SimpleTableDB = {
    id: number,
    name: string
};

export type SimpleTableId = Omit<SimpleTableDB, "name">;
export type SimpleTable = Omit<SimpleTableDB, "id">

export type ReadingBookDB = {
    id: number,
    book_id: number,
    title: string,
    author: string,
    image: string
};

export type TBRPriorityDB = {
    id: number,
    book_id: number,
    image: string
};

export type PurchasesDB = {
    id: number,
    book_id: number,
    title: string,
    author: string,
    image: string,
    price: number,
    format: string,
    store: string,
    month: number
}

export type StatsMainDB = {
    year: number,
    total_books_read: number,
    total_pages_read: number,
    total_hours_listened: HoursListened,
    reading_goal: number,
    total_books_owned: number,
    owned_books_read: number,
    average_days_to_read: number,
    average_rating: number,
    favorite_book: string,
    most_pages: number,
    least_pages: number,
};

export type HoursListened = {
    hours: number,
    minutes: number
};

export type BookRead = {
    date_finished: Date,
    rating: number,
}
