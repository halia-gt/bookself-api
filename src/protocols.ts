export type ApplicationError = {
    name: string;
    message: string;
};

export type AuthorDB = {
    id: number,
    name: string,
    identity: string,
    country: string
};

export type Author = Omit<AuthorDB, "id">;

export type Country = {
    id: number,
    name: string
};

export type CountryId = Omit<Country, "name">;

export type Genre = {
    id: number,
    name: string
};

export type GenreId = Omit<Genre, "name">;
